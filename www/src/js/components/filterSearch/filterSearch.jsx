import React from 'react';
import { observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import debug from 'debug';
const log = debug('infect:FilterSearch');

@observer
export default class FilterSearch extends React.Component {
    
    @observable searchTerm = '';

    @computed get matches() {
        const matches = this.props.filterValues.search(this.searchTerm);
        log('Matches are %o', matches);
        return matches;
    }

    @action _handleSearchInputChange(value) {
        log('Filter input changed to %s', value);
        this.searchTerm = value;
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
                <div className="group group--lead search-wrapper">
                    <h3>Search filters</h3>
                    <a onClick={ (ev) => this._resetSearchTerm() } className="search__clear"><h3>clear</h3></a>
                    <input type="text" placeholder="Property" className="group__input input search__input" 
                        onChange={ (ev) => this._handleSearchInputChange(ev.target.value) } value={ this.searchTerm }
                        ref={ (el) => this._setInputElement(el) } />
                </div>
                <div className={ 'group group--black-font search ' + (this.searchTerm === '' ? '' : 'search--visible') }>
                    <ul className="group__list group__list--vertical search__results" >
                        { this.matches.length > 0 && 
                            this.matches.slice(0, 10).map((item) => {
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
                            })
                        }
                        { this.matches.length === 0 &&
                            <li className="group__list-item list-item result">
                                <div className="label">
                                    <p className="label--small label--gray label--nomargin">
                                        Term: { this.searchTerm }
                                    </p>
                                    <p className="label--bold label--larger label--nomargin">
                                        No results found
                                    </p>
                                </div>
                            </li>
                        }
                    </ul>
               </div>
            </div>
        );
    }

}