import { observer } from 'mobx-react';
import { computed } from 'mobx';
import React from 'react';
import AntibioticsFilterList from './antibioticsFilterList.jsx';
import BacteriaFilterList from './bacteriaFilterList.jsx';
import PopulationFilterList from './populationFilterList.jsx';
import MostUsedFiltersList from './mostUsedFiltersList.jsx';
import GuidelinesFilterList from './GuidelinesFilterList.jsx';

/**
 * Holds all filters (without tab navigation or the search input) in the sidebar on the left.
 */
@observer
class FilterList extends React.Component {

    @computed get bacteriaFilters() {
        return this.props.filterValues.getPropertiesForEntityType('bacterium');
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
                        <GuidelinesFilterList
                            identifier="guidelines"
                            additionalClassNames="guidelines-selector-for-fabian-blue-background"
                            guidelines={this.props.guidelines}
                        />
                        <hr className="divider" />
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
