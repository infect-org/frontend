import { fetchApi } from '../../helpers/api';
import Fetcher from '../../helpers/standardFetcher';
import Resistance from './resistance';
import { computed, reaction } from 'mobx';
import debug from 'debug';
const log = debug('infect:ResistancesFetcher');

export default class ResistancesFetcher extends Fetcher {

	/**
	* Fetches resistances from server, then updates ResistancesStore passed as an argument.
	* 
	* @param [0-2] 								See Fetcher
	* @param {ResistanceStore} stores			Stores for antibiotics and bacteria
	* @param {SelectedFilters} selectedFilters	Selected filters – needed to determine which resistance
	*											data (e.g. region) to fetch.
	*/
	constructor(url, store, dependentStores, stores, selectedFilters) {
		super(url, store, dependentStores);
		// Remove json from URL
		this._baseUrl = url.replace(/\..*$/, '');
		this._stores = stores;
		this._selectedFilters = selectedFilters;
		reaction(() => this._selectedFilters.getFiltersByType('region'), () => {
			const regions = this._selectedFilters.getFiltersByType('region');
			if (!regions.length) this._url = `${ this._baseUrl }.json`;
			else this._url = `${ this._baseUrl }_${ regions[0].value }.json`;
			log('Url for regions %o is %s, fetch data.', regions, this._url);
			this.getData();
		});
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
			const bacteriumName = resistance.bacteriaName.substr(0, resistance.bacteriaName.indexOf('/') - 1).toLowerCase();
			const bacterium = bacteria.find((item) => item.name.toLowerCase() === bacteriumName);
			const antibioticName = resistance.compoundName.toLowerCase();
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
		});
	}

}