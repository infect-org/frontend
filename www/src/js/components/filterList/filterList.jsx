import React from 'react';
import AntibioticsFilterList from './antibioticsFilterList';
import BacteriaFilterList from './bacteriaFilterList';
import PopulationFilterList from './populationFilterList';
import MostUsedFiltersList from './mostUsedFiltersList';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

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
                            [<MostUsedFiltersList identifier="mostUsed"
                                mostUsedFilters={ this.props.mostUsedFilters }
                                selectedFilters={ this.props.selectedFilters } key="content" />,
                            <hr className="divider" key="divider" />]
                        }
                        <AntibioticsFilterList identifier="antibiotics"
                            filterValues={ this.props.filterValues }
                            selectedFilters={ this.props.selectedFilters } />
                        <hr className="divider" />
                        <BacteriaFilterList identifier="bacteria"
                            filterValues={ this.props.filterValues }
                            selectedFilters={ this.props.selectedFilters } />
                        <hr className="divider" />
                        <PopulationFilterList identifier="population"
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
