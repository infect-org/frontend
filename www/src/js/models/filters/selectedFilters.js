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

	/**
	* Note amount of times the filters changed. Why? Because we want to start the animations
	* only when filters change (and not while the matrix is setting up). The components will
	* therefore watch this property and only transition when it's > 0.
	*/
	@observable filterChanges = 0;

	@action addFilter(filter) {
		log('Add filter %o, filters are %o', filter, this._selectedFilters.peek());
		// Prevent users from adding similar filters
		const duplicate = this._selectedFilters.find((item) => deepEqual(item, filter));
		if (duplicate) {
			console.warn('Tried to add duplicate entry %o', filter);
			return;
		}
		this.filterChanges++;
		this._selectedFilters.push(filter);
	}

	@action removeFilter(filter) {
		log('Remove filter %o, filters are %o', filter, this._selectedFilters.peek());
		const index = this._selectedFilters.indexOf(this.findFilter(filter));
		if (index === -1) {
			log('Filter %o not found in selectedFilters %o', filter, this._selectedFilters);
			return;
		}
		this.filterChanges++;
		this._selectedFilters.splice(index, 1);
	}

	@action toggleFilter(filter) {
		log('Toggle filter %o', filter);
		this.isSelected(filter) ? this.removeFilter(filter) : this.addFilter(filter);
	}

	/**
	* Returns a filter that equals the filter passed or null
	*/
	findFilter(filter) {
		return this._selectedFilters.find((item) => item === filter);
	}

	/**
	* Returns true if a filter that equals filter is selected
	*/
	isSelected(filter) {
		const selected = this.findFilter(filter);
		log('Is filter %o selected? %o', filter, !!selected);
		return !!selected;
	}

	@computed get filters() {
		return this._selectedFilters.peek();
	}

	@computed get originalFilters() {
		return this._selectedFilters;
	}

	@action removeAllFilters() {
		log('Remove all filters');
		this.filterChanges++;
		this._selectedFilters.splice(0, this._selectedFilters.length);
	}

	/**
	* Returns all filters for a certain entityType
	*/
	getFiltersByType(entityType) {
		return this._selectedFilters.filter((item) => {
			return item.property.entityType === entityType;
		});
	}

}

