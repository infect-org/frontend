import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox';
import generateFilterList from './generateFilterList';
import debug from 'debug';
const log = debug('infect:PopulationFilterList');

@observer
class PopulationFilterList extends React.Component {

	_handleFilterChange(item) {
		log('Handle filter change for region %o', item);
		// Make sure only one region filter is selected: Remove all currently
		// selected filters
		this.props.selectedFilters.getFiltersByType('region').forEach((filter) => {
			this.props.selectedFilters.removeFilter(filter);
		});
		// Add current filter – but only if not «all regions» (empty) was selected
		if (item) this.props.selectedFilters.addFilter(item);
	}

	@computed get noRegionSelected() {
		return this.props.selectedFilters.getFiltersByType('region').length === 0;
	}

	render() {
		return (
			<div id="population-filters">
                <h3 className="gray margin-top">Region</h3>
				<ul className="group__list group__list--vertical">
					<FilterListCheckbox inputType='radio' inputName="region-name" name="All regions"
							value="" onChangeHandler={(ev) => this._handleFilterChange()} 
							checked={ this.noRegionSelected }/>
					{ this.props.filterValues.getValuesForProperty('region', 'name').map((item) => {
						return <FilterListCheckbox inputType='radio' key={item.value} name={item.niceValue}
							inputName="region-name" value={item.niceValue} checked={this.props.selectedFilters.isSelected(item)}
							onChangeHandler={(ev) => this._handleFilterChange(item)} />;
					})}
				</ul>

			</div>
		);
	}

}

export default generateFilterList(PopulationFilterList);