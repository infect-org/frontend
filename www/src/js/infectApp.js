/**
* The main application that brings everything together
*/

import 'whatwg-fetch';
import {fetchApi} from './helpers/api';
import Antibiotic from './models/antibiotics/antibiotic';
import AntibioticsStore from './models/antibiotics/antibioticsStore';
import SubstanceClass from './models/antibiotics/substanceClass';
import SubstanceClassesStore from './models/antibiotics/substanceClassesStore';
import Bacterium from './models/bacteria/bacterium';
import BacteriaStore from './models/bacteria/bacteriaStore';
import Resistance from './models/resistances/resistance';
import ResistancesStore from './models/resistances/resistancesStore';
import MatrixView from './models/matrix/matrixView';
import getFilterConfig from './models/filters/getFilterConfig.js';
import PropertyMap from './models/propertyMap/propertyMap';
import {observable, autorun, reaction} from 'mobx';
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

		// Make promise public so that anything outside can check if data is ready.
		// Don't directly return the promise as a constructor should return the class
		// instance.
		this.getDataPromise = this._getData();

		this.views.matrix.setSelectedFilters(this.selectedFilters);

		this._createRegions();

	}




	/**
	* Confgiures filterValues for antibiotics, bacteria etc.
	*/
	_setupFilterValues() {
		const filterConfig = getFilterConfig();
		filterConfig.forEach((config) => {
			this.filterValues.addConfiguration(config.entityType, config.config);
			log('FilterConfig set for %s', config.entityType);
		});
	}



	/**
	* Gets data from server, transforms it and creates entities (AB, resistances, BACT out of it).
	*/
	async _getData() {
		const results = {};
		const calls = ['bacteria', 'antibiotics', 'resistances', 'substanceClasses'].map((entity) => {
			return this._fetchData(this._config.endpoints.apiPrefix + this._config.endpoints[entity])
				.then((result) => {
					results[entity] = result;
				});
		});
		return Promise.all(calls).then(() => {

			// ab.substanceClasses may have duplicates (for en/de) – remove them
			const antibiotics = results.antibiotics.data;
			antibiotics.forEach((item) => {
				const newData = item.substanceClasses.reduce((prev, item) => {
					prev.set(item.id, item);
					return prev;
				}, new Map());
				item.substanceClasses = Array.from(newData.values());
			});


			this._createAntibiotics(antibiotics, results.substanceClasses.data);
			this._createBacteria(results.bacteria.data);
			// Must be at the end, ab and bact must be created first.
			this._createResistances(results.resistances.data);
			log('Got data; ab are %o, bacteria %o, resistances %o', this.antibiotics, this.bacteria, this.resistances);
			this.views.matrix.addData(this.antibiotics.getAsArray(), this.bacteria.getAsArray(), this.resistances.getAsArray());
		}, (err) => {
			throw new Error(`InfectApp: Could not get data. ${ err.name }: ${ err.message }.`);
		});
	}


	async _fetchData(url) {
		return fetchApi(url);
	}


	_createAntibiotics(antibiotics, substanceClasses) {

		// Lowest class (grandchild) will be added to antibiotic
		let lowestSubstanceClass;
		// Create substance classes
		antibiotics.forEach((ab) => {

			// Get sc by hierarchy, parent-most (grand-grand-parent) first as it needs to be 
			// created first (subsequent children need the parent on sc's constructor)
			// First ist top-most
			const sorted = [];
			let parentId = null;
			let counter = 0;
			while (sorted.length < ab.substanceClasses.length && counter < 15) {
				counter++;
				// Hierarchies are not correct *OR* an ab might have multiple scs that are not hierarchical.
				if(counter > 13) console.error('BAD DATA for scs:', counter, ab, substanceClasses, parentId);
				ab.substanceClasses.some((sc) => {
					const originalSc = substanceClasses.find((item) => item.id === sc.id);
					if (originalSc.parent === parentId) {
						sc.parent = parentId;
						sorted.push(sc);
						parentId = sc.id;
						return true;
					}
				});
			}
			log('Sorted sc for ab %o are %o', ab, sorted);

			sorted.forEach((sc, index) => {
				if (this.substanceClasses.getById(sc.id)) return;
				const parent = !sc.parent ? undefined : this.substanceClasses.getById(sc.parent);

				// Color and order is on substanceClasses.json while other props are on antibiotics.json
				// -> Merge them
				const originalSc = substanceClasses.find((item) => item.id === sc.id);
				sc.color = originalSc.color;
				sc.order = originalSc.order;

				const substanceClass = new SubstanceClass(sc.id, sc.name, parent, {
					color: sc.color
					, order: sc.order
				});
				this.filterValues.addEntity('substanceClass', substanceClass);
				this.substanceClasses.add(substanceClass);
			});

		});

		antibiotics.map((ab) => {
			// #todo: Hierarchical substance classes
			// #todo: Remove this check; all ab should have scs (?)
			if (!ab.substanceClasses.length) {
				console.warn('InfectApp: AB %o has no SCs', ab);
				return;
			}
			const sc = ab.substanceClasses && ab.substanceClasses.length ? 
				this.substanceClasses.getById(ab.substanceClasses[0].id) : undefined;
			const antibiotic = new Antibiotic(ab.id, ab.name, sc, {
				iv: ab.iv
				, po: ab.po
			});
			this.filterValues.addEntity('antibiotic', antibiotic);
			this.antibiotics.add(antibiotic);
		});

	}


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


	_createBacteria(bacteria) {
		bacteria.map((bact) => {
			const bacterium = new Bacterium(bact.id, bact.name, {
				aerobic: bact.aerobic
				, anaerobic: bact.anaerobic
				, gram: bact.gram
				, shape: bact.shape
			});
			this.filterValues.addEntity('bacterium', bacterium);
			this.bacteria.add(bacterium);
		});
	}


	_createResistances(resistances) {

		const missingAntibiotics = [];

		const bacteria = this.bacteria.get().values();
		const antibiotics = this.antibiotics.get().values();

		//const maxSampleSize = resistances.reduce((prev, current) => Math.max(current, prev), 0);
		resistances.forEach((res, index) => {

			// !!! CAREFUL !!! In the JSON file, bacteria and antibiotics were interchanged!
			// bacteria -> antibiotic, compound -> bacteria!
			const compoundName = res.compoundName.substr(0, res.compoundName.indexOf('/') - 1).toLowerCase();
			const bacterium = bacteria.find((item) => {
				//console.log(item.name.toLowerCase(), compoundName);
				return item.name.toLowerCase() === compoundName;
			});
			const abName = res.bacteriaName.toLowerCase();
			const abSingularName = abName.replace(/e\b/g, '');
			const abNameVariants = [
				abName
				// Some antibiotic's names are in plural form
				, abSingularName
				, abName.replace(/\//g, ' / ')
				, abSingularName.replace(/\//g, ' / ')
			];
			const antibiotic = antibiotics.find((item) => {
				if (abNameVariants.indexOf(item.name.toLowerCase()) > -1) return true;
			});
			if (!bacterium) {
				console.error('InfectApp: Bacterium %o not found for resistance %o', res.compoundName, res);
				return;
			}
			if (!antibiotic) {
				missingAntibiotics.push(abName);
				console.error('InfectApp: Antibiotic %o not found for resistance %o, names are %o', res.bacteriaName, res, abNameVariants);
				return;
			}

			// #todo: Remove – only needed for old/bad data
			if (!bacterium || !antibiotic) {
				console.warn('Missing data for', res);
				return;
			}
			const resistanceValues = [];
			/*if (res.resistanceDefault) resistanceValues.push({
				type: 'default'
				, value: this._getCharacter(res.resistanceDefault)
				, sampleSize: this._getRandomSampleSize()
			});
			if (res.classResistanceDefault) resistanceValues.push({
				type: 'class'
				, value: this._getCharacter(res.classResistanceDefault)
				, sampleSize: this._getRandomSampleSize()
			});*/
			if (res.resistanceImport) resistanceValues.push({
				type: 'import'
				, value: res.resistanceImport / 100
				, sampleSize: res.sampleCount || 0
			});
			if (!resistanceValues.length) {
				console.error('InfectApp: ResistanceValue not set for %o', res);
				return;
			}
			//console.error(resistanceValues);
			this.resistances.add(new Resistance(resistanceValues, antibiotic, bacterium));
		
		});

		const singularMissingAntibiotics = missingAntibiotics.filter((item, index) => missingAntibiotics.lastIndexOf(item) === index);
		console.error('InfectApp: Missing antibiotics: %s', singularMissingAntibiotics.join(', '));

	}



	// #todo: remove when data's ready
	/*_getRandomSampleSize() {
		return Math.round(Math.random() * 5000 * 100);
	}*/
	// #todo: remove
	/*_getCharacter(value) {
 		return value === 3 ? 0.9 : (value === 2 ? 0.6 : 0.3);
	}*/


}

