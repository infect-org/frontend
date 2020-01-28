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

    _getTranslation(title) {
        const plural = this.props.selectedFilters.length > 1;
        switch (title) {
            case 'substanceClasses':
                return plural ? 'Substance Classes' : 'Substance Class';
            case 'antibiotics':
                return plural ? 'Antibiotics' : 'Antibiotic';
            case 'bacteria':
                return plural ? 'Bacteria' : 'Bacterium';
            case 'regions':
                return plural ? 'Regions' : 'Region';
            case 'ageGroups':
                return plural ? 'Age Groups' : 'Age Group';
            case 'diagnoses':
                return plural ? 'Diagnoses' : 'Diagnosis';
            case 'animals':
                return plural ? 'Animals' : 'Animal';
        }
    }

	render() {
        if (!this._isVisible()) return null;
		return (
            <div className="group group--black-font">
                <h2>{ this._getTranslation(this.props.type) }</h2>
                <ul className="group__list">
                    { this.props.selectedFilters.map((item) => {
                        return <SelectedFilter
                            type={this.props.type}
                            key={`${item.property.name}-${item.value}`} 
                            filter={item} 
                            removeFilterHandler={this.removeFilterHandler.bind(this)}
                        />;
                    }) }
                </ul>
            </div>
		);
	}

}