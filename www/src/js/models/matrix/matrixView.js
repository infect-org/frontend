import calculateXPositions from './calculateXPositions';
import sortAntibiotics from './sortAntibiotics';
import AntibioticMatrixView from '../antibiotics/antibioticMatrixView';
import SubstanceClassMatrixView from '../antibiotics/substanceClassMatrixView';
import SubstanceClass from '../antibiotics/substanceClass';
import BacteriumMatrixView from '../bacteria/bacteriumMatrixView';
import {computed, observable, action} from 'mobx';
import debug from 'debug';
import getArrayDiff from '../../helpers/getArrayDiff'

const log = debug('infect:matrixView');

class MatrixView {


	@observable radius = 0;
	@observable space = 10;

	//@observable _antibiotics = new Map();

	constructor() {
		// #todo: Why do decorators not work for Maps? Maybe it's a cross-compiling issue?
		/* Key: Antibiotic ID (for inverse resolution of matrixView – mobx only allows numbers & shit), 
		   value: AntibioticMatrixView */
		this._antibiotics = observable.map();
		this._substanceClasses = observable.map();
		/* Key: Bacterium ID (for inverse resolution of matrixView – mobx only allows promitives as keys), 
		   value: BacteriumMatrixView */
		this._bacteria = observable.map();

		// Needed to calculate space that's available for the matrices content
		// Key: antibiotic, value: height in px
		this._antibioticLabelHeights = new Map();
		this._bacteriaLabelWidths = new Map();

	}


	/**
	* Adds data for multiple properties at once. Is nice as all data becomes available at the
	* same time. 
	*/
	@action addData(antibiotics = [], bacteria = [], substanceClasses = []) {
		antibiotics.forEach((ab) => this.addAntibiotic(ab));
		bacteria.forEach((bact) => this.addBacterium(bact));
	}








	/**
	* Adds antibiotic
	* @param {Antibiotic} antibiotic
	*/
	@action addAntibiotic(antibiotic) {
		// Add antibiotics
		if (this._antibiotics.has(antibiotic.id)) throw new Error(`MatrixView: Trying to add antibiotic with duplicate key ${ antibiotic.id }.`);
		this._antibiotics.set(antibiotic.id, new AntibioticMatrixView(antibiotic, this));
		//console.log('MatrixView: added ab, size is', antibiotic, this._antibiotics.size);
		// Add substanceClasses
		const scs = antibiotic.getSubstanceClasses();
		scs.forEach((item) => {
			if (this._substanceClasses.has(item.id)) return;
			this._substanceClasses.set(item.id, new SubstanceClassMatrixView(item), this);
		});
	}

	@computed get antibiotics() {
		return Array.from(this._antibiotics.values());
	}

	@computed get substanceClasses() {
		return Array.from(this._substanceClasses.values());
	}

	/**
	* @returns {Array}		Array of antibiotics sorted for matrix, each item is a AntibioticMatrixView
	*/
	@computed get sortedAntibiotics() {
		// Convert to Antibiotics and then back to AntibioticMatrixViews. Why? Because it makes
		// the sortFunction simpler
		const sorted = sortAntibiotics(this.antibiotics.map((item) => item.antibiotic));
		return sorted.map((antibiotic) => this._antibiotics.get(antibiotic.id));
	}

	setAntibioticLabelHeight(antibiotic, height) {
		if (!height) return;
		if (this._antibioticLabelHeights.get(antibiotic) === height) return;
		this._antibioticLabelHeights.set(antibiotic, height);
		this._calculateRadius();
	}









	/**
	* Sets dimensions of the SVG whenever it is changed. 
	* @param {BoundingClientRects} boundingBox
	*/
	setDimensions(boundingBox) {
		if (!boundingBox) return;
		if (this._dimensions && this._dimensions.height === boundingBox.height && this._dimensions.width === boundingBox.width) return;
		this._dimensions = {
			height: boundingBox.height
			, width: boundingBox.width
		};
		this._calculateRadius();
	}

	/**
	* Set radius for resistances as soon as all necessary measurements are available.
	* Radius must be calculated independent of visible antibiotics; it should not change when something becomes visible or not.
	*/
	@action _calculateRadius() {
		if (!this._bacteria.size || this._bacteriaLabelWidths.size !== this._bacteria.size) return;
		if (!this._dimensions) return;
		const maxLabelWidth = Math.ceil(Array.from(this._bacteriaLabelWidths.values()).reduce((prev, item) => Math.max(prev, item), 0));
		const numberOfAntibiotics = this._antibiotics.size;
		// Every time at least one substance class changes (from antibiotic to antibiotic), we have to add an additional space. 
		// Calculate how many times this happens.
		const numberOfSubstanceClassChanges = this.sortedAntibiotics.reduce((prev, item) => {
			if (!prev.item) return { count: 0, item: item };
			const diffs = getArrayDiff(prev.item.antibiotic.getSubstanceClasses(), item.antibiotic.getSubstanceClasses());
			return { count: diffs.removed.length || diffs.added.length ? prev.count + 1 : prev.count, item: item };
		}, { count: 0, item: undefined }).count;
		log('Calculate radius; maxLabelWidth is %d, numberOfAntibiotics %d, numberOfSubstanceClassChanges %d, width %d', 
			maxLabelWidth, numberOfAntibiotics, numberOfSubstanceClassChanges, this._dimensions.width);
		this.radius = (this._dimensions.width - (numberOfSubstanceClassChanges + numberOfAntibiotics) * this.space) / numberOfAntibiotics;
	}






	/**
	* Returns bacteria, sorted A->Z
	* @param {Array} 		Array of bacteria, sorted
	*/
	@computed get sortedBacteria() {
		return Array.from(this._bacteria.values()).sort((a, b) => a.bacterium.name < b.bacterium.name ? -1 : 1);
	}

	@action addBacterium(bacterium) {
		console.log('add', bacterium);
		this._bacteria.set(bacterium.id, new BacteriumMatrixView(bacterium, this));
	}

	@computed get yPositions() {
		const positions = new Map();
		console.log('calculate yPos');
		Array.from(this._bacteria.values()).map((bact) => Map.set(bact, 0));
		return positions;
	}

	setBacteriumLabelWidth(bacterium, width) {
		this._bacteriaLabelWidths.set(bacterium, width);
		this._calculateRadius();
	}





	/**
	* Calculate xPositions for AB and SCs; do it here (instead of in every single component) to speed things up; values
	* are calculated only **once** after anything changes.
	*
	* @returns {Map}		Key: AntibioticMatrixView or SubstanceClassMatrixView
	*/
	@computed get xPositions() {
		const xPositions = calculateXPositions(this.sortedAntibiotics.map((item) => item.antibiotic), this.radius, this.space);
		// Map raw ab/scs to corresponding martrixViews
		const result = new Map();
		xPositions.forEach((value, key) => {
			const newKey = key instanceof SubstanceClass ? this._substanceClasses.get(key.id) : this._antibiotics.get(key.id);
			result.set(newKey, value);
		});
		return result;
	}

}

export default MatrixView;

