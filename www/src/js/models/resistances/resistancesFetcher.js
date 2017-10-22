import { fetchApi } from '../../helpers/api';
import { observable } from 'mobx';
import Resistance from './resistance';

export default class ResistancesFetcher {

	@observable fetching = true;

	/**
	* Fetches resistances from server, then updates ResistancesStore passed as an argument.
	* 
	* @param {String} endpoint					URL to the resistances
	* @param {Object} stores					Object with keys: antibiotics and bacteria with corresponding
	*											stores.
	* @param {ResistanceStore} store			Store in which resistances are stored once fetched
	* @param {SelectedFilters} selectedFilters	Selected filters – needed to determine which resistance
	*											data (e.g. region) to fetch.
	*/
	constructor(endpoint, stores, store, selectedFilters) {
		if (!endpoint || !stores || !(typeof store === 'object') || !store || !selectedFilters) {
			throw new Error(`ResistancesFetcher: Parameters missing`);
		}
		this._endpoint = endpoint;
		this._stores = stores;
		this._resistancesStore = store;
		this._selectedFilters = selectedFilters;
	}

	async getData() {

		// Create new promise which is only resolved when data is parsed and added to store
		let dataReadyPromiseResolver;
		const dataReadyPromise = new Promise((resolve) => dataReadyPromiseResolver = resolve);
		this._resistancesStore.setFetchPromise(dataReadyPromise);

		const response = await this._fetchData();
		// Only continue when antibiotics and bacteria are ready
		if (this._stores.antibiotics.status !== 'ready') await this._stores.antibiotics.fetchPromise;
		if (this._stores.bacteria.status !== 'ready') await this._stores.bacteria.fetchPromise;

		this._handleData(response.data);
		dataReadyPromiseResolver();

	}
	

	/**
	* Sets up ResistancesStore with data fetched from server.
	* @param {Array} data		Data as gotten from server
	*/
	_handleData(data) {
		const bacteria = this._stores.bacteria.get().values();
		const antibiotics = this._stores.antibiotics.get().values();

		data.forEach((resistance) => {
			// !!! CAREFUL !!! In the JSON file, bacteria and antibiotics were interchanged!
			const compoundName = resistance.compoundName.substr(0, resistance.compoundName.indexOf('/') - 1).toLowerCase();
			const bacterium = bacteria.find((item) => item.name.toLowerCase() === compoundName);
			const antibioticName = resistance.bacteriaName.toLowerCase();
			const antibiotic = antibiotics.find((item) => item.name.toLowerCase() === antibioticName);

			if (!bacterium || !antibiotic) {
				console.error('ResistancesFetcher: Antibiotic %o or bacterium %o missing for %o', antibiotic, bacterium, resistance);
				return;
			}

			const resistanceValues = [{
				type: 'import'
				, value: resistance.resistanceImport / 100
				, sampleSize: resistance.sampleCount || 0				
			}];
			const resistanceObject = new Resistance(resistanceValues, antibiotic, bacterium);
			this._resistancesStore.add(resistanceObject);
		});
	}


	/**
	* Fetches data from server
	*/
	async _fetchData() {
		return fetchApi(this._getUrl());
	}

	/**
	* Returns URL for resistances that includes the filters selected
	*/
	_getUrl() {
		return this._endpoint;
	}

}