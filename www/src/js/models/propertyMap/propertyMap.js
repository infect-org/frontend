import SearchableMap from './searchableMap';
import {computed, createTransformer} from 'mobx';
import debug from 'debug';
const log = debug ('infect:PropertyMap');

/**
* Creates a map of properties of instances/objects so that they can be 
* - searched
* - filtered by (and be displayed in a filter list)
*/
export default class PropertyMap {

	/**
	* We want to search by property values – use them as keys so that they can be 
	* easily found.
	*/
	constructor() {
		// Objects with properties: name, niceName and entityType
		this._properties = new SearchableMap();
		// Objects with properties: value, niceValue and property (link to a property in 
		// this._properties)
		this._propertyValues = new SearchableMap();
		this._configurations = {};
	}


	/**
	* Returns all values for a certain entityType and propertyName. Needed to display
	* filter lists.
	* @return {Array}
	*/
	getValuesForProperty(entityType, propertyName) {
		return createTransformer((filter) => {
			const property = this._properties.getBy({ entityType: filter.entityType, name: filter.propertyName });
			if (!property.length) return [];
			return this._propertyValues.getBy({ property: property[0] });			
		})({ entityType: entityType, propertyName: propertyName });
	}


	/**
	* Returns all properties for a certain entity type.
	* @return {Array}
	*/
	getPropertiesForEntityType(entityType) {
		// https://github.com/mobxjs/mobx/issues/291
		//console.error('props', this._properties.getBy({ entityType: entityType }), this._properties.values);
		//console.error('props');
		return createTransformer((entityType) => {
			return this._properties.getBy({ entityType: entityType });
		})(entityType);
	}


	/**
	* Adds a configuration for an certain entity type. 
	* @param {String} entityType
	* @param {Object} config			Object with an property per property that should be added from entity:
	*									  { 
	*										[propertyName]: {
	*											translation: 'PropertyNameTranslation'
	*											, valueTranslations: [
	*												{value: 'value', translation: 'translation' }
	*											]
	*									  } 
	*/
	addConfiguration(entityType, config) {
		this._configurations[entityType] = config;
	}


	/**
	* Parses an entity and adds filters
	*/
	addEntity(entityType, entity) {
		const config = this._configurations[entityType];
		if (!config) {
			throw new Error(`PropertyMap: Before you can add an entity, you have to provide a configuration matching it.`);
		}

		const properties = Object.keys(entity);
		properties.forEach((property) => {

			// Only add properties that are part of a config
			if (!config[property]) return;

			// Get/create property
			let existingProperties = this._properties.getBy({ entityType: entityType, name: property });
			if (!existingProperties.length) {
				const niceName = this._getTranslation(config[property].translation, property);
				existingProperties = this._properties.add({ entityType: entityType, name: property, niceName: niceName });
			}

			// Get/create value
			const value = entity[property];
			const existingValues = this._propertyValues.getBy({ property: existingProperties[0], value: value });
			// Value exists
			if (existingValues.length) return;

			const valueTranslations = config[property].valueTranslations;
			let niceValueName;
			// valueTranslations is a function (one for all values)
			if (typeof valueTranslations === 'function') {
				niceValueName = this._getTranslation(valueTranslations, value);
			}
			// valueTranslations is an array; get item for the current value
			else if (Array.isArray(valueTranslations)) {
				niceValueName = this._getTranslation(valueTranslations.find((item) => item.value === value).translation, value);
			}
			else {
				throw(`PropertyMap: Unknown type of valueTranslations; needs to be an Array or a Function, is ${ valueTranslations }.`);
			}

			log('Added value "%s" to property %o, entity was %o', value, existingProperties[0], entity);
			this._propertyValues.add({ property: existingProperties[0], value: value, niceValue: niceValueName });

		});

	}


	/**
	* We can provide a string or a function as translation; check which is given and return
	* corresponding value.
	* @param {String|Function} translation
	* @param {String} value
	*/
	_getTranslation(translation, value) {	
		if (!translation) {
			console.warn(`PropertyMap: Translation for value ${ value } is missing; return original value.`);
			return value;
		}
		if (typeof translation === 'string') return translation;
		if (typeof translation === 'function') return translation(value);
		//throw(`PropertyMap: Unknown type for a translation, ${ typeof translation }.`);
	}

}


