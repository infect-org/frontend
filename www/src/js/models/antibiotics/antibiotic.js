import {observable, computed} from 'mobx';

class Anitibiotic {

	constructor(id, name, substanceClass) {

		if (!id || !name || !substanceClass) throw new Error('Antibiotic: Arguments missing');

		this.id = id;
		this.name = name;
		this.substanceClass = substanceClass;
	}


	/**
	* Returns visiblity. Antibiotic is visible if
	* - none of the parent substance classes are contracted
	* - antibiotic matches filter
	* - all parent substance classes match te filter
	*/
	@computed get visible() {
		// One of the parent substanceClasses is contracted
		if (this.getSubstanceClasses.find((sClass) => !sClass.expanded)) return false;
		// Filters on ab/sc (tbd)
		return true;
	}


	/**
	* Returns substance class hierarchy of this antibiotic as an array: 
	* @returns {Array} Substance classes			[child, parent, grandparent] where every entry is
	*												an instance of SubstanceClass
	*/
	getSubstanceClasses() {
		// Get all parent substanceClasses and push their name 
		// into classes, bottom up
		let sc = this.substanceClass;
		const classes = [];
		while(sc) {
			classes.push(sc);
			sc = sc.parent;
		}
		return classes;
	}

}

export default Anitibiotic;