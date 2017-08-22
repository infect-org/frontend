/**
* The main application that brings everything together
*/

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
import {observable} from 'mobx';
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

		// Make promise public so that anything outside can check if data is ready.
		// Don't directly return the promise as a constructor should return the class
		// instance.
		this.getDataPromise = this._getData();

	}


	/**
	* Gets data from server, transforms it and creates entities (AB, resistances, BACT out of it).
	*/
	async _getData() {
		const results = {};
		const calls = ['bacteria', 'antibiotics', 'resistances'].map((entity) => {
			return this._fetchData(this._config.endpoints.apiPrefix + this._config.endpoints[entity])
				.then((result) => {
					results[entity] = result;
				});
		});
		return Promise.all(calls).then(() => {
			this._createAntibiotics(results.antibiotics.data);
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


	_createAntibiotics(antibiotics) {

		// Create substance classes
		// #todo: Hierarchical substance classes
		antibiotics.forEach((ab) => {
			ab.substanceClasses.forEach((sc) => {
				if (!this.substanceClasses.getById(sc.id)) {
					this.substanceClasses.add(new SubstanceClass(sc.id, sc.name));
				}
			});
		});

		antibiotics.map((ab) => {
			// #todo: Hierarchical substance classes
			// #todo: Remove this check; all ab should have scs (?)
			if (!ab.substanceClasses.length) return;
			this.antibiotics.add(new Antibiotic(ab.id, ab.name, this.substanceClasses.getById(ab.substanceClasses[0].id)));
		});

	}


	_createBacteria(bacteria) {
		bacteria.map((bact) => {
			this.bacteria.add(new Bacterium(bact.id, bact.name));
		});
	}


	_createResistances(resistances) {
		resistances.map((res) => {
			const bacterium = this.bacteria.getById(res.id_bacteria);
			const antibiotic = this.antibiotics.getById(res.id_compound);
			// #todo: Remove – only needed for old/bad data
			if (!bacterium || !antibiotic) {
				console.warn('Missing data for', res);
				return;
			}
			const resistanceValues = [];
			if (res.resistanceDefault) resistanceValues.push({
				type: 'default'
				, value: this._getCharacter(res.resistanceDefault)
				, sampleSize: this._getRandomSampleSize()
			});
			if (res.classResistanceDefault) resistanceValues.push({
				type: 'class'
				, value: this._getCharacter(res.classResistanceDefault)
				, sampleSize: this._getRandomSampleSize()
			});
			if (res.resistanceImport) resistanceValues.push({
				type: 'import'
				, value: res.resistanceImport / 100
				, sampleSize: this._getRandomSampleSize()
			});
			if (!resistanceValues.length) return;
			//console.error(resistanceValues);
			this.resistances.add(new Resistance(resistanceValues, antibiotic, bacterium));
		});
	}

	// #todo: remove when data's ready
	_getRandomSampleSize() {
		return Math.round(Math.random() * 5000 * 100);
	}
	// #todo: remove
	_getCharacter(value) {
 		return value === 3 ? 0.9 : (value === 2 ? 0.6 : 0.3);
	}


}

