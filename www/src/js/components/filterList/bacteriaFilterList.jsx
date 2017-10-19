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
		const existing = this.props.selectedFilters.filters.indexOf(item) > -1;
		if (!existing) this.props.selectedFilters.addFilter(item);
		else this.props.selectedFilters.removeFilter(item);
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
		const names = this.props.filterValues.getValuesForProperty('bacterium', 'name').sort(this._sortByProperty('niceValue'));
		return names.filter((name) => {
			const filterIsSelected = this.props.selectedFilters.isSelected(name);
			return (selected) ? filterIsSelected : !filterIsSelected;
		});
	}

	render() {
		return (
			<div>
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

                <h3 className="gray margin-top">Aerobic</h3>
				<ul className="group__list group__list--vertical">
					{this.props.filterValues.getValuesForProperty('bacterium', 'aerobic').map((item) => {
						return <FilterListCheckbox key={item.value} name={item.niceValue} 
							value={item.niceValue} checked={this.props.selectedFilters.isSelected(item)}
							onChangeHandler={(ev) => this._handleFilterChange(item)} />;
					})}
				</ul>

                <h3 className="gray margin-top">Anaerobic</h3>
				<ul className="group__list group__list--vertical">
					{this.props.filterValues.getValuesForProperty('bacterium', 'anaerobic').map((item) => {
						return <FilterListCheckbox key={item.value} name={item.niceValue} 
							value={item.niceValue} checked={this.props.selectedFilters.isSelected(item)}
							onChangeHandler={(ev) => this._handleFilterChange(item)} />;
					})}
				</ul>

			</div>
		);
	}

}

export default generateFilterList(BacteriaFilterList);