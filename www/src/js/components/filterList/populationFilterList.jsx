import React from 'react';
import { observer } from 'mobx-react';
import { computed, transaction } from 'mobx';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox';
import generateFilterList from './generateFilterList';
import debug from 'debug';
const log = debug('infect:PopulationFilterList');

@observer
class PopulationFilterList extends React.Component {

	_handleFilterChange(item) {
		log('Handle filter change for region %o', item);
		// Make sure only one region filter is selected: Remove all currently
		// selected filters. Do this in one single operation or multiple fetches
		// will be done (selected region is removed, then new region is added).
		transaction(() => {
			this.props.selectedFilters.getFiltersByType('region').forEach((filter) => {
				this.props.selectedFilters.removeFilter(filter);
			});
			// Add current filter – but only if not «all regions» (empty) was selected
			if (item) this.props.selectedFilters.addFilter(item);
		});
	}

	@computed get isNoRegionSelected() {
		return this.props.selectedFilters.getFiltersByType('region').length === 0;
	}

	render() {
		return (
			<div id="population-filters">
                <h3 className="gray margin-top">Region</h3>
				<ul className="group__list group__list--vertical">
					<FilterListCheckbox inputType='radio' inputName="region-name" name="All regions"
							value="" onChangeHandler={() => this._handleFilterChange()} 
							checked={ this.isNoRegionSelected }/>
					{ this.props.filterValues.getValuesForProperty('region', 'identifier').map((item) => {
						return <FilterListCheckbox inputType='radio' key={item.value} name={item.niceValue}
							inputName="region-name" value={item.niceValue} checked={this.props.selectedFilters.isSelected(item)}
							onChangeHandler={() => this._handleFilterChange(item)} />;
					})}
				</ul>

			</div>
		);
	}

}

export default generateFilterList(PopulationFilterList);