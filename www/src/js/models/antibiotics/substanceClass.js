import {observable} from 'mobx';

class SubstanceClass {

	constructor(id, name, parent) {
		if (!id || !name) throw new Error('SubstanceClass: Arguments missing');
		if (parent && !(parent instanceof SubstanceClass)) throw new Error('SubstanceClass: parent must be an instance of SubstanceClass');
		this.id = id;
		this.name = name;
		// Parent property shall not be set if not available (and not .parent = undefined)
		if (parent) this.parent = parent;
		// Expanded is true by default
		this.expanded = true;
	}

	/**
	* Returns all parent substance classes, youngest (child) first.
	* @return {Array}		Array of substanceClass
	*/
	getParentSubstanceClasses() {
		const classes = [this];
		while(classes.slice(-1)[0].parent) {
			classes.push(classes.slice(-1)[0].parent);
		}
		return classes.slice(1);
	}


}

export default SubstanceClass;