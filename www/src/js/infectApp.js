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
			// #todo: Remove
			if (!bacterium || !antibiotic) {
				console.warn('Missing data for', res);
				return;
			}
			this.resistances.add(new Resistance(undefined, undefined, undefined, antibiotic, bacterium));
		});
	}


}

