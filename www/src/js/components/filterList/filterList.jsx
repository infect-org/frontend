import React from 'react';
import AntibioticFilterList from './antibioticFilterList';
import {observer} from 'mobx-react';

export default class FilterList extends React.Component {

	render() {
		return (
            <div className="filter">
				<AntibioticFilterList title="Antibiotika" filterValues={this.props.filterValues} selectedFilters={this.props.selectedFilters}/>
				<hr className="divider" />
			</div>
		);
	}

}