/**
* The main application that sets everything up and brings it together
*/
import 'whatwg-fetch';
import AntibioticsStore from './models/antibiotics/antibioticsStore';
import AntibioticsFetcher from './models/antibiotics/antibioticsFetcher';
import SubstanceClassesStore from './models/antibiotics/substanceClassesStore';
import SubstanceClassesFetcher from './models/antibiotics/substanceClassesFetcher';
import BacteriaStore from './models/bacteria/bacteriaStore';
import BacteriaFetcher from './models/bacteria/bacteriaFetcher';
import ResistancesStore from './models/resistances/resistancesStore';
import ResistancesFetcher from './models/resistances/resistancesFetcher';
import MatrixView from './models/matrix/matrixView';
import getFilterConfig from './models/filters/getFilterConfig.js';
import PropertyMap from './models/propertyMap/propertyMap';
import { observe, observable } from 'mobx';
import SelectedFilters from './models/filters/selectedFilters';
import debug from 'debug';
const log = debug('infect:App');

export default class InfectApp {

	@observable views = {
		matrix: new MatrixView()
	};


	/**
	* @param {Object} config		e.g. {
	*									endpoints: {
	*										apiPrefix: '/'
	*										bacteria: 'bacterium'
	*										antibiotics: 'antibiotic'
	*										resistances: 'resistance'
	*									}
	*								}
	*/
	constructor(config) {
		this._config = config;

		this.bacteria = new BacteriaStore();
		this.antibiotics = new AntibioticsStore();
		this.substanceClasses = new SubstanceClassesStore();
		this.resistances = new ResistancesStore([], (item) => item.bacterium.id + '/' + item.antibiotic.id);
		
		this.filterValues = new PropertyMap();
		this._setupFilterValues();
		this.selectedFilters = new SelectedFilters();

		this._setupFetchers();

		this.views.matrix.setSelectedFilters(this.selectedFilters);
		this.views.matrix.setupDataWatchers(this.antibiotics, this.bacteria, this.resistances);

		this._createRegions();

	}



	/**
	* Fetches data from the server, sets up data in the correct order and puts them into the
	* corresponding stores.
	*/
	_setupFetchers() {

		// Substance classes (must be loaded first)
		const substanceClassesFetcher = new SubstanceClassesFetcher(
			this._config.endpoints.apiPrefix + this._config.endpoints.substanceClasses
			, this.substanceClasses
		);
		substanceClassesFetcher.getData();

		// Antibiotics (wait for substance classes)
		const antibioticsFetcher = new AntibioticsFetcher(
			this._config.endpoints.apiPrefix + this._config.endpoints.antibiotics
			, this.antibiotics
			, [this.substanceClasses]
			, this.substanceClasses
		);
		antibioticsFetcher.getData();

		// Bacteria
		const bacteriaFetcher = new BacteriaFetcher(
			this._config.endpoints.apiPrefix + this._config.endpoints.bacteria
			, this.bacteria
		);
		bacteriaFetcher.getData();

		// Resistances (wait for antibiotics and bacteria)
		const resistanceFetcher = new ResistancesFetcher(
			this._config.endpoints.apiPrefix + this._config.endpoints.resistances
			, this.resistances
			, [ this.antibiotics, this.bacteria ]
			, {
				antibiotics: this.antibiotics
				, bacteria: this.bacteria
			}
			, this.selectedFilters
		);
		resistanceFetcher.getData();

	}



	/**
	* Confgiures filterValues for antibiotics, bacteria etc., then adds data for all entities
	* as soon as it becomes available (after data is fetched from server).
	*/
	_setupFilterValues() {
		const filterConfig = getFilterConfig();
		filterConfig.forEach((config) => {
			this.filterValues.addConfiguration(config.entityType, config.config);
			log('FilterConfig set for %s', config.entityType);
		});

		const entities = [{
			singular: 'substanceClass'
			, plural: 'substanceClasses'
		}, {
			singular: 'antibiotic'
			, plural: 'antibiotics'
		}, {
			singular: 'bacterium'
			, plural: 'bacteria'
		}];
		
		entities.forEach((entityConfig) => {
			observe(this[entityConfig.plural].get(), (change) => {
				if (change.type === 'add') {
					this.filterValues.addEntity(entityConfig.singular, change.newValue);
				}
			});
		});

	}



	/**
	* Creates filters for regions. 
	* Replace as soon as real data is available.
	*/
	_createRegions() {

		const regionNames = ['Basel', 'Genf', 'Mittelland', 'Bern', 'Ticion'];
		const regions = regionNames.map((item) => ({
			name: item
			, identifier: item.toLowerCase().replace(/\s*/g, '-')
		}));
		regions.forEach((region) => {
			this.filterValues.addEntity('region', region);
		});

	}


}

