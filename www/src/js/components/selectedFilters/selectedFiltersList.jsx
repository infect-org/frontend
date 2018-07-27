import React from 'react';
import { observer } from 'mobx-react';
import SelectedFiltersForType from './selectedFiltersForType';
import filterTypes from '../../models/filters/filterTypes';

@observer
export default class SelectedFiltersList extends React.Component {

	removeFilter(filter) {
		this.props.selectedFilters.removeFilter(filter);
	}

	render() {
		return (
            <div className="top-navigation__active-filters groups">
            	<SelectedFiltersForType type="antibiotics" removeFilter={this.removeFilter.bind(this)} selectedFilters={this.props.selectedFilters.getFiltersByType(filterTypes.antibiotic)} />
            	<SelectedFiltersForType type="substanceClasses" removeFilter={this.removeFilter.bind(this)} selectedFilters={this.props.selectedFilters.getFiltersByType(filterTypes.substanceClass)} />
            	<SelectedFiltersForType type="bacteria" removeFilter={this.removeFilter.bind(this)} selectedFilters={this.props.selectedFilters.getFiltersByType(filterTypes.bacterium)} />
                <SelectedFiltersForType type="regions" removeFilter={this.removeFilter.bind(this)} selectedFilters={this.props.selectedFilters.getFiltersByType(filterTypes.region)} />
                <SelectedFiltersForType type="ageGroups" removeFilter={this.removeFilter.bind(this)} selectedFilters={this.props.selectedFilters.getFiltersByType(filterTypes.ageGroup)} />
                { this.props.selectedFilters.filters.length > 1 &&
                	<div className="group group--black-font">
                        <h2><strong>Clear all filters</strong></h2>
                        <button className="button button--clearall" onClick={ (ev) => this.props.selectedFilters.removeAllFilters() }><span>&times;</span></button>
                    </div>
                }
            </div>
		);
	}

}