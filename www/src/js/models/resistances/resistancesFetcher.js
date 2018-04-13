import Fetcher from '../../helpers/standardFetcher';
import Resistance from './resistance';
import { reaction } from 'mobx';
import debug from 'debug';
const log = debug('infect:ResistancesFetcher');

export default class ResistancesFetcher extends Fetcher {

	/**
	* Fetches resistances from server, then updates ResistancesStore passed as an argument.
	* 
	* @param [0-3] 								See Fetcher
	* @param {ResistanceStore} stores			Stores for antibiotics and bacteria
	* @param {SelectedFilters} selectedFilters	Selected filters – needed to determine which 
	*											resistance data (e.g. region) to fetch.
	*/
	constructor(url, store, options, dependentStores, stores, selectedFilters) {
		super(url, store, options, dependentStores);

		this._stores = stores;
		this._selectedFilters = selectedFilters;

		// Set default headers: When the initial API call is made, no filter will be set
		this._options.headers = {
			filter: `region.identifier='switzerland-all'`,
			// this is a bug, '*', nothing or single propertiesshould work; TODO: update to save 
			// traffic
			select: '*, generics:region.identifier', 
		};

		// Only update data if region changed
		this._previousRegions = [];

		// Watch regions – when they change, update data. Don't use getFiltersByType
		// as it delays responses (and leads to race conditions).
		reaction(() => this._selectedFilters.filterChanges, () => {
			const regions = this._selectedFilters.getFiltersByType('region');
			log('Regions changed from %o to %o', this._previousRegions, regions);
			// No change since last update
			if (
				regions.length === this._previousRegions.length 
				// There's only 1 region that can be set. Check if names match, order is not
				// important
				&& regions.every((region, index) => {
					return this._previousRegions[index].value === region.value;
				})
			) {
				log('Regions did not change, return');
				return;
			}
			// switzerland-all will never be a filter (as it's a non-filter and should not be 
			// displayed atop the matrix) – use it as default.
			const region = regions.length ? regions[0].value : 'switzerland-all';
			log('Selected region is %s, make new request', region);
			this._previousRegions = regions.slice(0);
			// Set header (will be consumed by StandardFetcher); this._options is an inherited
			// property of StandardFetcher.
			this._options.headers.filter = `region.identifier='${ region }'`;
			log('Options to fetch resistances are %o', this._options);
			
			this.getData();
		});
	}


	/**
	* Sets up ResistancesStore with data fetched from server.
	* @param {Array} data		Data as gotten from server
	*/
	_handleData(data) {

		log('Handle data %o', data);

		this._store.clear();

		const bacteria = this._stores.bacteria.get().values();
		const antibiotics = this._stores.antibiotics.get().values();

		data.forEach((resistance) => {

			// Some resistances don't contain compound data. Slack, 2018-04-05:
			// fxstr [4:38 PM]
			// es hat einige resistances ohne id_compound. wie soll ich die handeln? ignorieren?
			// ee [4:38 PM]
			// iu
			// müssen wir dann noch anschauen
			if (!resistance.id_compound) {
				console.warn(`ResistanceFetcher: Resistance %o does not have compound information;
					ignore for now, but should be fixed.`);
				return;
			}

			const bacterium = bacteria.find((item) => item.id === resistance.id_bacterium);
			const antibiotic = antibiotics.find((item) => item.id === resistance.id_compound);

			if (!antibiotic) {
				console.error(`ResistancesFetcher: Antibiotic missing in %o for 
					resistance %o`, antibiotics, resistance);
				return;
			}

			if (!bacterium) {
				console.error(`ResistancesFetcher: Bacterium missing in %o for 
					resistance %o`, bacteria, resistance);
				return;
			}

			const resistanceValues = [{
				type: 'import'
				, value: resistance.resistance / 100
				, sampleSize: resistance.sampleCount || 0
				, confidenceInterval: [
					resistance.confidenceIntervalLowerBound / 100, 
					resistance.confidenceIntervalHigherBound / 100
				]
			}];
			const resistanceObject = new Resistance(resistanceValues, antibiotic, bacterium);

			// Duplicate resistance
			if (this._store.hasWithId(resistanceObject)) {
				console.warn(`ResistanceFetcher: Resistance ${ JSON.stringify(resistance) } is
					a duplicate; an entry for the same bacterium and antibiotic does exist.`);
				return;
			}

			this._store.add(resistanceObject);
		});
	}

}

