import React from 'react';
import SelectedFilter from './selectedFilter';
import { observer } from 'mobx-react';

@observer
export default class SelectedFiltersList extends React.Component {

    _isVisible() {
        return !!this.props.selectedFilters.length;
    }

    /**
    * Propagates filter that should be removed upwards
    */
    removeFilterHandler(item) {
        this.props.removeFilter(item);
    }

	render() {
        if (!this._isVisible()) return null;
		return (
            <div className="group group--black-font">
                <h2>{this.props.type}</h2>
                <ul className="group__list">
                    {this.props.selectedFilters.map((item) => {
                        return <SelectedFilter key={item.property.name + '-' + item.value} filter={item} 
                            removeFilterHandler={this.removeFilterHandler.bind(this)}/>;
                    })}
                </ul>
            </div>
		);
	}

}