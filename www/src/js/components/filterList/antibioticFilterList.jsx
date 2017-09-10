import React from 'react';
import { createTransformer, computed } from 'mobx';
import { observer } from 'mobx-react';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox';
import generateFilterList from './generateFilterList';
import debug from 'debug';
const log = debug('infect:AntibioticFilterList');

@observer
class AntibioticFilterList extends React.Component {

	_sortByProperty(property) {
		return (a, b) => a[property] < b[property] ? -1 : 1;
	}

	_handleFilterChange = (item) => {
		log('Handle filter change for item %o', item);
		const existing = this.props.selectedFilters.filters.indexOf(item) > -1;
		if (!existing) this.props.selectedFilters.addFilter(item);
		else this.props.selectedFilters.removeFilter(item);
	}

	_handleDropdownFilterChange(index) {
		const selected = this._getNamesBySelection()[index];
		this._handleFilterChange(selected);
	}

	_isChecked(item) {
		return createTransformer((item) => {
			return this.props.selectedFilters.filters.indexOf(item) > -1;
		})(item);
	}

	_getNamesBySelection(selected) {
		const names = this.props.filterValues.getValuesForProperty('antibiotic', 'name').sort(this._sortByProperty('niceValue'));
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
				<select className="select" onChange={(ev) => this._handleDropdownFilterChange(ev.target.value)}>
					<option>Please chose …</option>
					{this._getNamesBySelection().map((item, index) => {
						return <option key={item.value} value={index}>{item.niceValue}</option>;
					})};
				</select>

                <h3 className="gray margin-top">Substance Class</h3>
				<ul className="group__list group__list--vertical">
					{this.props.filterValues.getValuesForProperty('substanceClass', 'name').sort(this._sortByProperty('niceValue')).map((item) => {
						return <FilterListCheckbox key={item.value} name={item.niceValue} 
							value={item.niceValue} checked={this.props.selectedFilters.isSelected(item)}
							onChangeHandler={(ev) => this._handleFilterChange(item)} />;
					})}
				</ul>

			</div>
		);
	}

}

export default generateFilterList(AntibioticFilterList);