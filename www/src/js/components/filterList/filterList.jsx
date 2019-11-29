import { observer } from 'mobx-react';
import { computed } from 'mobx';
import debug from 'debug';
import React from 'react';
import AntibioticsFilterList from './antibioticsFilterList.jsx';
import BacteriaFilterList from './bacteriaFilterList.jsx';
import PopulationFilterList from './populationFilterList.jsx';
import MostUsedFiltersList from './mostUsedFiltersList.jsx';
import GuidelinesFilterList from './GuidelinesFilterList.jsx';

const log = debug('infect:filterList');

/**
 * Holds all filters (without tab navigation or the search input) in the sidebar on the left.
 */
@observer
class FilterList extends React.Component {

    @computed get bacteriaFilters() {
        const filters = this.props.filterValues.getPropertiesForEntityType('bacterium');
        log('Bacteria filters are %o', filters);
        return filters;
    }

    render() {
        return (
            <div className="filter">
                { /* Only display filters when they are ready – but wait for bacteria (async),
                     don't display when regions (sync/hard coded) are ready */ }
                { this.bacteriaFilters.length > 0 &&
                    <div>
                        { this.props.mostUsedFilters.mostUsedFilters.length > 0 &&
                            [
                                <MostUsedFiltersList
                                    identifier="mostUsed"
                                    mostUsedFilters={ this.props.mostUsedFilters }
                                    selectedFilters={ this.props.selectedFilters }
                                    key="content"
                                />,
                                <hr className="divider" key="divider" />,
                            ]
                        }
                        {/* Don't display guidelines if there is no data. Some tenants may not have
                            chosen the guideline module or not yet have entered their data */}
                        { this.props.guidelines && this.props.guidelines.get().size > 0 &&
                            <React.Fragment>
                                <GuidelinesFilterList
                                    identifier="guidelines"
                                    additionalClassNames="guidelines-selector-for-fabian-blue-background"
                                    guidelines={this.props.guidelines}
                                />
                                <hr className="divider" />
                            </React.Fragment>
                        }
                        <AntibioticsFilterList
                            identifier="antibiotics"
                            filterValues={ this.props.filterValues }
                            selectedFilters={ this.props.selectedFilters } />
                        <hr className="divider" />
                        <BacteriaFilterList
                            identifier="bacteria"
                            filterValues={ this.props.filterValues }
                            selectedFilters={ this.props.selectedFilters } />
                        <hr className="divider" />
                        <PopulationFilterList
                            identifier="population"
                            filterValues={ this.props.filterValues }
                            selectedFilters={ this.props.selectedFilters }
                            offsetFilters={ this.props.offsetFilters }/>
                    </div>
                }
            </div>
        );
    }

}

export default FilterList;
