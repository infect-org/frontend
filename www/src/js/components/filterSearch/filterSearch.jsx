import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

@observer
export default class FilterSearch extends React.Component {
	
	@observable searchTerm = '';
	@observable matches = [];

	@action _handleSearchInputChange(value) {
		this.searchTerm = value;
		this.matches = this.props.filterValues.search(value);
	}

	_filterClickedHandler(item) {
		this.props.selectedFilters.toggleFilter(item);
		this._resetSearchTerm();
	}

	@action _resetSearchTerm() {
		this.searchTerm = '';
		this._inputElement.focus();
	}

	_setInputElement(el) {
		this._inputElement = el;
	}

	render() {
		return (
			<div>
                <div className="group group--lead">
                    <h3>Filter durchsuchen</h3>
                    <input type="text" placeholder="Eigenschaft" className="group__input input search__input" 
                    	onChange={ (ev) => this._handleSearchInputChange(ev.target.value) } value={ this.searchTerm }
                    	ref={ (el) => this._setInputElement(el) } />
                </div>
                <div className={ 'group group--black-font search ' + (this.searchTerm === '' ? '' : 'search--visible') }>
					<ul className="group__list group__list--vertical search__results" >
                        { this.matches.map((item) => {
                        	return <li className="group__list-item list-item result" onClick={ (ev) => this._filterClickedHandler(item) }
								key={ item.property.entityType + '-' + item.property.name + '-' + item.value }>
                         		<div className="label">
                            	    <p className="label--small label--gray label--nomargin">
                            	    	{ item.property.entityType[0].toUpperCase() + item.property.entityType.substr(1) } 
                            	    	- { item.property.niceName }
                            	    </p>
                                	<p className="label--bold label--larger label--nomargin">{ item.niceValue }</p>
                            	</div>
                        	</li>;
                        }) }
					</ul>


                    { /*<ul className="group__list group__list--vertical search__results">
                        <li className="group__list-item list-item result">
                            <div className="label">
                                <p className="label--small label--gray label--nomargin">Bakterium - Färbung</p>
                                <p className="label--bold label--larger label--nomargin">Gram +</p>
                            </div>
                        </li>
                        <li className="group__list-item result result--active">
                            <div className="result__checkmark"></div>
                            <div className="label">
                                <p className="label--small label--gray label--nomargin">Bakterium - Färbung</p>
                                <p className="label--bold label--larger label--nomargin">Gram -</p>
                            </div>
                        </li>
                        <li className="group__list-item result result">
                            <div className="label">
                                <p className="label--small label--gray label--nomargin">Antibiotikum - Wirkstoff</p>
                                <p className="label--bold label--larger label--nomargin">Gramophomin</p>
                            </div>
                        </li>
                    </ul> */ }
                </div>
            </div>
		);
	}

}