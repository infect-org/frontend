import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { filterTypes } from '@infect/frontend-logic';
import debug from 'debug';
import OffsetFilters from './offsetFilters';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox';
import generateFilterList from './generateFilterList';

const log = debug('infect:PopulationFilterList');

@observer
class PopulationFilterList extends React.Component {

    constructor(props) {
        super(props);
        this.handleAnimalFilterChange = this.handleAnimalFilterChange.bind(this);
    }

    _handleFilterChange(item) {
        log('Handle filter change for population filter %o', item);
        this.props.selectedFilters.toggleFilter(item);
    }

    @computed get offsetMinimumValue() {
        const rdaConfig = this.props.tenantConfig.getConfig('rda');
        if (rdaConfig) return rdaConfig.sampleCountFilterLowerThreshold || 0;
    }

    /**
     * At least one filter must be selected (defaults to 'all'); therefore we have to overwrite the
     * filter selection logic.
     */
    isSelected(region) {
        // switzerland-all ist set to default where we fetch the regions
        return this.props.selectedFilters.isSelected(region);
    }

    /**
     * Don't return switzerland-all as a filter as it cannot be combined and is a «non-filter»
     */
    @computed get regionFilters() {
        return this.props.filterValues.getValuesForProperty(filterTypes.region, 'id');
    }

    @computed get animalFilters() {
        return this.props.filterValues.getValuesForProperty(filterTypes.animal, 'id');
    }

    @computed get ageGroupFilters() {
        const ageGroups = this.props.ageGroupStore.getAsArray();
        const values = this.props.filterValues.getValuesForProperty(filterTypes.ageGroup, 'id');
        // Take sort order from tenantConfig which was stored in ageGroupStore
        return values.sort((a, b) => ageGroups.find(({ id }) => id === a.value).order -
            ageGroups.find(({ id }) => id === b.value).order);
    }

    @computed get hospitalStatusFilters() {
        return this.props.filterValues.getValuesForProperty(filterTypes.hospitalStatus, 'id');
    }

    @computed get isNoRegionSelected() {
        return this.props.selectedFilters.getFiltersByType(filterTypes.region).length === 0;
    }

    handleAnimalFilterChange(event) {
        const filter = this.animalFilters[event.target.value];
        this.props.selectedFilters.toggleFilter(filter);
    }

    render() {
        return (
            <div id="population-filters">
                {this.animalFilters.length > 0 &&
                    <React.Fragment>
                        <h3 className="gray margin-top">Animal</h3>
                        <select
                            className="select"
                            onChange={this.handleAnimalFilterChange}
                        >
                            <option>Please choose …</option>
                            {this.animalFilters.map((animalFilter, index) => (
                                <option key={animalFilter.value} value={index}>
                                    {animalFilter.niceValue}
                                </option>
                            ))}
                        </select>
                    </React.Fragment>
                }

                <h3 className="gray margin-top">Region</h3>
                <ul className="group__list group__list--vertical">
                    { this.regionFilters.map(item => (
                        <FilterListCheckbox key={ item.value }
                            name={ item.niceValue } inputName="region-name" value={ item.niceValue }
                            checked={ this.isSelected(item) }
                            onChangeHandler={ () => this._handleFilterChange(item) } />
                    ))}
                </ul>
                <h3 className="gray margin-top">Age Group</h3>
                <ul className="group__list group__list--vertical">
                    { this.ageGroupFilters.map(item => (
                        <FilterListCheckbox key={ item.value }
                            name={ item.niceValue } inputName="ageGroup-name"
                            value={ item.niceValue } checked={ this.isSelected(item) }
                            onChangeHandler={ () => this._handleFilterChange(item) } />
                    ))}
                </ul>
                <h3 className="gray margin-top">Hospital status</h3>
                <ul className="group__list group__list--vertical">
                    { this.hospitalStatusFilters.map(item => (
                        <FilterListCheckbox key={ item.value }
                            name={ item.niceValue } inputName="hospitalStatus-name"
                            value={ item.niceValue } checked={ this.isSelected(item) }
                            onChangeHandler={ () => this._handleFilterChange(item) } />
                    ))}
                </ul>
                <OffsetFilters
                    identifier="data"
                    offsetFilters={this.props.offsetFilters}
                    offsetMinimumValue={this.offsetMinimumValue}
                />
            </div>
        );
    }

}

export default generateFilterList(PopulationFilterList);
