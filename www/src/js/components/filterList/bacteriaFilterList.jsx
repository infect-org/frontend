import React from 'react';
import { createTransformer, computed } from 'mobx';
import { observer } from 'mobx-react';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox';
import generateFilterList from './generateFilterList';
import debug from 'debug';
const log = debug('infect:BacteriaFilterList');

@observer
class BacteriaFilterList extends React.Component {

	_sortByProperty(property) {
		return (a, b) => a[property] < b[property] ? -1 : 1;
	}

	_handleFilterChange = (item) => {
		log('Handle filter change for item %o', item);
		this.props.selectedFilters.toggleFilter(item);
	}


	/**
	* Called whenever the value of the name dropdown changes.
	*/
	_handleNameDropdownFilterChange(index) {
		const selected = this._getNamesBySelection()[index];
		this._handleFilterChange(selected);
	}


	/**
	* Returns true if the item passed is selected.
	* @param {Object} item		Any filter item that's selection state should be checked
	* @returns {Boolean}
	*/
	_isChecked(item) {
		return createTransformer((item) => {
			return this.props.selectedFilters.filters.indexOf(item) > -1;
		})(item);
	}

	/**
	* Returns all names that are either selected or not.
	* @param {Boolean} selected		True if selected names should be returned, else false
	*/
	_getNamesBySelection(selected) {
		const names = this.props.filterValues.getValuesForProperty('bacterium', 'name')
			.sort(this._sortByProperty('niceValue'));
		return names.filter((name) => {
			const filterIsSelected = this.props.selectedFilters.isSelected(name);
			return (selected) ? filterIsSelected : !filterIsSelected;
		});
	}


	_isMetabolismChecked(type) {
		const { isFilterSelected } = this._getFilterForMetabolism(type);
		return isFilterSelected;
	}

	/**
	* Gets positive (true) filter for perOs or iv, returns it and its selected state.
	* @param {String} type		'intravenous' or 'perOs'
	* @returns {Object}
	*/
	_getFilterForMetabolism(type) {
		const filter = this.props.filterValues.getValuesForProperty('bacterium', type)
			.find((item) => item.value === true);
		const isFilterSelected = this.props.selectedFilters.isSelected(filter);
		return {
			isFilterSelected
			, filter
		};
	}

	_handleMetabolismChange(type) {
		const { filter, isFilterSelected } = this._getFilterForMetabolism(type);
		log('Filter for %s is %o, selected %o', type, filter, isFilterSelected);
		this.props.selectedFilters.toggleFilter(filter);
	}



	render() {
		return (
			<div id="bacteria-filters">
                <h3 className="gray margin-top">Name</h3>
				<ul className="group__list group__list--vertical">
					{this._getNamesBySelection(true).map((item) => {
						return <FilterListCheckbox key={item.value} name={item.niceValue} 
							value={item.niceValue} checked={this.props.selectedFilters.isSelected(item)}
							onChangeHandler={(ev) => this._handleFilterChange(item)} />;
					})}
				</ul>
				<select className="select" onChange={(ev) => this._handleNameDropdownFilterChange(ev.target.value)}>
					<option>Please chose …</option>
					{this._getNamesBySelection().map((item, index) => {
						return <option key={item.value} value={index}>{item.niceValue}</option>;
					})};
				</select>

                <h3 className="gray margin-top">Gram</h3>
				<ul className="group__list group__list--vertical">
					{this.props.filterValues.getValuesForProperty('bacterium', 'gram').map((item) => {
						return <FilterListCheckbox key={item.value} name={item.niceValue} 
							value={item.niceValue} checked={this.props.selectedFilters.isSelected(item)}
							onChangeHandler={(ev) => this._handleFilterChange(item)} />;
					})}
				</ul>

                <h3 className="gray margin-top">Shape</h3>
				<ul className="group__list group__list--vertical">
					{this.props.filterValues.getValuesForProperty('bacterium', 'shape').map((item) => {
						if (!item.value) return;
						return <FilterListCheckbox key={item.value} name={item.niceValue} 
							value={item.niceValue} checked={this.props.selectedFilters.isSelected(item)}
							onChangeHandler={(ev) => this._handleFilterChange(item)} />;
					})}
				</ul>

				{ /* Metabolism combines aerobic and anaerobic properties and therefore needs special handling */ }
                <h3 className="gray margin-top">Metabolism</h3>
				<ul className="group__list group__list--vertical">
					<FilterListCheckbox name="Aerobic" value="aerobic" 
						checked={ this._isMetabolismChecked('aerobic') } 
						onChangeHandler={(ev) => this._handleMetabolismChange('aerobic')} />
					<FilterListCheckbox name="Anaerobic" value="anaerobic" 
						checked={ this._isMetabolismChecked('anaerobic') } 
						onChangeHandler={(ev) => this._handleMetabolismChange('anaerobic')} />
				</ul>

			</div>
		);
	}

}

export default generateFilterList(BacteriaFilterList);