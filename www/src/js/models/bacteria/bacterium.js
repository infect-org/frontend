import {observable} from 'mobx';

class Bacterium {

	constructor(id, name, properties = {}) {

		if (!id || !name) throw new Error('Bacterium: Required arguments id or name missing');

		this.id = id;
		this.name = name;

		// Add properties
		Object.keys(properties).forEach((key) => {
			this[key] = properties[key];
		});

	}

}

export default Bacterium;