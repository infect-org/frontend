import React from 'react';
import { observer } from 'mobx-react';
import SelectedFiltersForType from './selectedFiltersForType';

@observer
export default class SelectedFiltersList extends React.Component {

	removeFilter(filter) {
		this.props.selectedFilters.removeFilter(filter);
	}

	render() {
		return (
            <div className="top-navigation__active-filters groups">
            	<SelectedFiltersForType type="antibiotics" removeFilter={this.removeFilter.bind(this)} selectedFilters={this.props.selectedFilters.getFiltersByType('antibiotic')} />
            	<SelectedFiltersForType type="bacteria" removeFilter={this.removeFilter.bind(this)} selectedFilters={this.props.selectedFilters.getFiltersByType('bacterium')} />
            </div>
		);
	}

}