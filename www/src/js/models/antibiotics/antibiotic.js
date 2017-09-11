import {observable, computed} from 'mobx';

export default class Antibiotic {

	/**
	* @param {Number|String} id
	* @param {String} name
	* @param {SubstanceClass|undefined} substanceClass
	*/
	constructor(id, name, substanceClass, properties = {}) {

		if (!id || !name) throw new Error('Antibiotic: Arguments missing');
		if (!substanceClass) throw new Error(`Antibiotic: Substance class must be provided`);

		this.id = id;
		this.name = name;
		this.substanceClass = substanceClass;

		// Add properties
		Object.keys(properties).forEach((key) => {
			this[key] = properties[key];
		});

	}



	/**
	* Returns visiblity. Antibiotic is visible if
	* - none of the parent substance classes are contracted
	* - antibiotic matches filters
	* - all parent substance classes match filters
	*/
	/*@computed get visible() {
		// One of the parent substanceClasses is contracted
		if (this.getSubstanceClasses().find((sClass) => !sClass.expanded)) return false;
		// Filters on ab/sc (tbd)
		return true;
	}*/



	/**
	* Returns substance class hierarchy of this antibiotic as an array – traverse substanceClass.parent
	* until parent is undefined.
	* @returns {Array} Substance classes			[child, parent, grandparent] where every entry is
	*												an instance of SubstanceClass
	*/
	getSubstanceClasses() {
		// Get all parent substanceClasses and push their name 
		// into classes, bottom up
		return [this.substanceClass].concat(this.substanceClass.getParentSubstanceClasses());
	}

}