import React from 'react';
import AntibioticsFilterList from './antibioticsFilterList';
import BacteriaFilterList from './bacteriaFilterList';
import {observer} from 'mobx-react';

export default class FilterList extends React.Component {

	render() {
		return (
            <div className="filter">
				<AntibioticsFilterList title="Antibiotics" filterValues={this.props.filterValues} selectedFilters={this.props.selectedFilters}/>
				<hr className="divider" />
				<BacteriaFilterList title="Bacteria" filterValues={this.props.filterValues} selectedFilters={this.props.selectedFilters}/>
			</div>
		);
	}

}