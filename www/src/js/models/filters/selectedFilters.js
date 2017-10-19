import { observable, action, computed, createTransformer } from 'mobx';
import deepEqual from 'deep-equal';
import debug from 'debug';
const log = debug('infect:SelectedFilters');

/**
* Just holds the filters that the user selected, which derive from a PropertyMap
*/
export default class SelectedFilters {

	/**
	* Array that holds the selected filters. Use shallow so that the items of the
	* array stay comparable; if we don't use shallow, they will be converted into
	* observables too.
	*/
	@observable.shallow _selectedFilters = [];

	@action addFilter(filter) {
		log('Add filter %o, filters are %o', filter, this._selectedFilters.peek());
		const duplicate = this._selectedFilters.find((item) => deepEqual(item, filter));
		if (duplicate) {
			log('Tried to add duplicate entry %o', filter);
			return;
		}
		this._selectedFilters.push(filter);
	}

	@action removeFilter(filter) {
		log('Remove filter %o, filters are %o', filter, this._selectedFilters.peek());
		const index = this._selectedFilters.indexOf(filter);
		if (index === -1) {
			log('Filter %o not found in selectedFilters %o', filter, this._selectedFilters);
			return;
		}
		this._selectedFilters.splice(index, 1);
	}

	isSelected(filter) {
		return createTransformer((filter) => {
			const selected = this._selectedFilters.indexOf(filter) > -1;
			log('Is filter %o selected? %o', filter, selected);
			return selected;
		})(filter);
	}

	@computed get filters() {
		return this._selectedFilters.peek();
	}

	@action removeAllFilters() {
		log('Remove all filters');
		this._selectedFilters.splice(0, this._selectedFilters.length);
	}

	/**
	* Returns all filters for a certain entityType
	*/
	getFiltersByType(entityType) {
		return this._selectedFilters.filter((item) => item.property.entityType === entityType);
	}

}