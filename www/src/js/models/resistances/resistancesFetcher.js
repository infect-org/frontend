import { fetchApi } from '../../helpers/api';
import Fetcher from '../../helpers/standardFetcher';
import Resistance from './resistance';

export default class ResistancesFetcher extends Fetcher {

	/**
	* Fetches resistances from server, then updates ResistancesStore passed as an argument.
	* 
	* @param [0-2] 								See Fetcher
	* @param {ResistanceStore} stores			Stores for antibiotics and bacteria
	* @param {SelectedFilters} selectedFilters	Selected filters – needed to determine which resistance
	*											data (e.g. region) to fetch.
	*/
	constructor(...args) {
		super(...args.slice(0, 3));
		this._stores = args[3];
		this._selectedFilters = args[4];
	}

	/**
	* Sets up ResistancesStore with data fetched from server.
	* @param {Array} data		Data as gotten from server
	*/
	_handleData(data) {

		this._store.clear();

		const bacteria = this._stores.bacteria.get().values();
		const antibiotics = this._stores.antibiotics.get().values();

		data.forEach((resistance) => {
			// !!! CAREFUL !!! In the JSON file, bacteria and antibiotics were interchanged!
			const bacteriumName = resistance.compoundName.substr(0, resistance.compoundName.indexOf('/') - 1).toLowerCase();
			const bacterium = bacteria.find((item) => item.name.toLowerCase() === bacteriumName);
			const antibioticName = resistance.bacteriaName.toLowerCase();
			const antibiotic = antibiotics.find((item) => {
				return item.name.toLowerCase() === antibioticName;
			});

			if (!antibiotic) {
				console.error('ResistancesFetcher: Antibiotic %o missing in %o for name %o and resistance %o', 
					antibiotic, antibiotics, antibioticName, resistance);
				return;
			}

			if (!bacterium) {
				console.error('ResistancesFetcher: Bacterium %o missing in %o for name %o and resistance %o', 
					bacterium, bacteria, bacteriumName, resistance);
				return;
			}

			const resistanceValues = [{
				type: 'import'
				, value: resistance.resistanceImport / 100
				, sampleSize: resistance.sampleCount || 0				
			}];
			const resistanceObject = new Resistance(resistanceValues, antibiotic, bacterium);
			this._store.add(resistanceObject);
			console.error('%d res added', this._store.get().size);
		});
	}

}