import { computed, action, observable } from 'mobx';

class Bacterium {

	/**
	* Some bacteria don't have any data for resistances – they are empty lines. Whenever a resistance
	* is initialized, it calls setHasDataForResistance. We'll filter the matrix by this property.
	*/
	@observable _hasDataForResistances = false;

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