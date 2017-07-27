/**
* Simple store for antibiotics, bacteria etc.
*/
export default class Store {

	/**
	* @param {Array} values					this.add is called for every value on initialization, therefore
	*										an array of items must be provided.
	* @param {Function} idGeneratorFunction	Function to generate a unique ID from the items passed in; takes
	*										item as an argument, must return a string, e.g.
	*										(item) => item.id_property1 + '/' + item.id_property2;
	*/
	constructor(values = [], idGeneratorFunction) {
		// Key: id, value: content. Use map to speed up lookups.
		this._items = new Map();
		this._idGeneratorFunction = idGeneratorFunction;

		// If values are passed, add them
		values.forEach((item) => this.add(item));
	}

	getAsArray() {
		return Array.from(this._items.values());		
	}

	get() {
		return this._items;
	}

	add(item, overwrite) {
		const id = this._idGeneratorFunction ? this._idGeneratorFunction(item) : item.id;
		if (!id) throw new Error(`Store: Field id is missing on item ${ JSON.stringify(item) }.`);
		if (!overwrite && this._items.has(id)) throw new Error(`Store: Tried to overwrite item with id ${ id } without using the appropriate overwrite argument.`);
		this._items.set(id, item);
	}

	getById(id) {
		return this._items.get(id);
	}

}