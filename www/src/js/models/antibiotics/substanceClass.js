import {observable} from 'mobx';

class SubstanceClass {

	constructor(id, name, parent) {
		if (!id || !name) throw new Error('SubstanceClass: Arguments missing');
		this.id = id;
		this.name = name;
		// Parent property shall not be set if not available (and not .parent = undefined)
		if (parent) this.parent = parent;
		// Expanded is true by default
		this.expanded = true;
	}



}

export default SubstanceClass;