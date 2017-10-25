import React from 'react';
import AntibioticsFilterList from './antibioticsFilterList';
import BacteriaFilterList from './bacteriaFilterList';
import PopulationFilterList from './populationFilterList';
import { observer } from 'mobx-react';
import { computed, reaction } from 'mobx';

@observer
class FilterList extends React.Component {

	@computed get bacteriaFilters() {
		const filters = this.props.filterValues.getPropertiesForEntityType('bacterium');
		return filters;
	}

	/*componentDidMount() {
		reaction(() => this.props.filterValues._properties._values.length, (len) => {
			console.error('l', len);
		});
	}*/

	render() {
		return (
            <div className="filter">
				{/* Only display filters when they are ready – but wait for bacteria (async), don't display when regions (sync/hard coded) are ready */ }
				{ this.bacteriaFilters.length > 0 && 
					<div>
						<AntibioticsFilterList title="Antibiotics" filterValues={this.props.filterValues} selectedFilters={this.props.selectedFilters} />
						<hr className="divider" />
						<BacteriaFilterList title="Bacteria" filterValues={this.props.filterValues} selectedFilters={this.props.selectedFilters} />
						<hr className="divider" />
						<PopulationFilterList title="Population" filterValues={this.props.filterValues} selectedFilters={this.props.selectedFilters} />
					</div>
				}
			</div>
		);
	}

}

export default FilterList;