import React from 'react';
import { observer } from 'mobx-react';
import { action, reaction, observable, computed } from 'mobx';
import debug from 'debug';
const log = debug('infect:FilterSearchSuggestions');

@observer
export default class FilterSearchSuggestions extends React.Component {
	
	@observable selectedMatchIndex = 0;

	componentDidMount() {
		// Register handler for events on input in parent component
		this.props.addSearchInputHandler(this._handleSearchInputEvents.bind(this));
		// Reset index to 0 when matches change
		reaction(() => this.props.matches, () => this.selectedMatchIndex = 0);
	}

	_handleSearchInputEvents(ev) {
		if (ev.keyCode === 40 || ev.keyCode === 13 || ev.keyCode === 38) ev.preventDefault();
        // Down
        if (ev.keyCode === 40) this._updateHighlight(1);
        // Up
        else if (ev.keyCode === 38) this._updateHighlight(-1);
        // Enter
        else if (ev.keyCode === 13) this._selectHighlight();

	}

    @action _updateHighlight(direction) {
        const nextHighlight = this.selectedMatchIndex + direction;
        if (nextHighlight < 0 || nextHighlight >= this.props.matches.length) return;
        else this.selectedMatchIndex = nextHighlight;
    }


    _getActiveClass(index) {
        if (index === this.selectedMatchIndex) return 'result--active';
        return '';
    }

    // TODO: Remove when Fabian's done
    _getDiagnosisClass() {
        return 'result--diagnosis'
    }

    /**
    * Called on enter
    */
    _selectHighlight() {
        const selected = this.props.matches[this.selectedMatchIndex];
        this.props.selectItemHandler(selected);
    }

    _filterClickedHandler(item) {
    	this.props.selectItemHandler(item);
    }

	render() {
		return(
            <div className={ 'group group--black-font search ' + (this.props.searchTerm === '' ? '' : 'search--visible') }>
                <ul className="group__list group__list--vertical search__results" >
                    { this.props.matches.length > 0 && 
                        this.props.matches.map((item, index) => {
                            return <li className={'group__list-item list-item result ' + this._getActiveClass(index) + ' ' + this._getDiagnosisClass() }
                                onClick={ (ev) => this._filterClickedHandler(item) }
                                key={ item.property.entityType + '-' + item.property.name + '-' + item.value }>
	                            <div style={ { opacity: this.props.isItemSelected(item) ? 1 : 0 } } className="result__checkmark"></div>
                                <div className="label">
                                    <p className="result__item label--small label--gray label--nomargin">
                                        { item.property.entityType[0].toUpperCase() + item.property.entityType.substr(1) } 
                                        - { item.property.niceName }
                                    </p>
                                    <p className="result__item label--bold label--larger label--nomargin">{ item.niceValue }</p>
                                </div>
                            </li>;
                        })
                    }
                    { this.props.matches.length === 0 &&
                        <li className="group__list-item list-item result">
                            <div className="label">
                                <p className="result__item label--small label--gray label--nomargin">
                                    Term: { this.props.searchTerm }
                                </p>
                                <p className="result__item label--bold label--larger label--nomargin">
                                    No results found
                                </p>
                            </div>
                        </li>
                    }
                </ul>
           </div>
		);
	}
}