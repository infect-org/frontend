import React from 'react';
import { createTransformer } from 'mobx';
import { observer } from 'mobx-react';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox';
import generateFilterList from './generateFilterList';

@observer
class AntibioticFilterList extends React.Component {

	_sortAntibiotics(a, b) {
		return a.niceValue < b.niceValue ? -1 : 1;
	}

	_handleFilterChange = (ev, item) => {
		const existing = this.props.selectedFilters.filters.indexOf(item) > -1;
		if (!existing) this.props.selectedFilters.addFilter(item);
		else this.props.selectedFilters.removeFilter(item);
	}

	_isChecked(item) {
		console.error(item, this.props.selectedFilters.filters);
		return createTransformer((item) => {
			return this.props.selectedFilters.filters.indexOf(item) > -1;
		})(item);
	}

	render() {
		return (
			<div>
				<ul className="group__list group__list--vertical">
					{this.props.filterValues.getValuesForProperty('antibiotic', 'name').sort(this._sortAntibiotics).map((item) => {
						return <FilterListCheckbox key={item.value} name={item.niceValue} 
							value={item.value} checked={this.props.selectedFilters.isSelected(item)}
							onChangeHandler={(ev) => this._handleFilterChange(ev, item)} />;
					})}
				</ul>
			</div>
		);
	}

}

export default generateFilterList(AntibioticFilterList);