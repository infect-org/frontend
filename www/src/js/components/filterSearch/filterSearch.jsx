import React from 'react';
import { observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import FilterSearchSuggestions from './filterSearchSuggestions';
import debug from 'debug';
const log = debug('infect:FilterSearch');

@observer
export default class FilterSearch extends React.Component {
    
    @observable searchTerm = '';

    constructor() {
        super();
        this._searchInputHandlers = [];
    }

    @computed get matches() {
        const matches = this.props.filterValues.search(this.searchTerm).slice(0, 10);
        log('Matches are %o', matches);
        return matches;
    }

    @action _handleSearchInputChange(value) {
        log('Filter input changed to %s', value);
        this.searchTerm = value;
    }

    @action _resetSearchTerm() {
        this.searchTerm = '';
        this._inputElement.focus();
    }

    /**
    * Store input element so that we can focus it after user selected an item.
    */
    _setInputElement(el) {
        log('Input element set to %o', el);
        this._inputElement = el;
    }

    selectItemHandler(selected) {
        log('Toggle filter %o', selected);
        this.props.selectedFilters.toggleFilter(selected);
        this._resetSearchTerm();

    }

    _handleSearchInputKeyDown = (ev) => {
        // Escape
        if (ev.keyCode === 27) this._resetSearchTerm();
        // Call handler on suggestions component
        this._searchInputHandlers.forEach((handler) => handler(ev));
    }

    addSearchInputHandler(handler) {
        this._searchInputHandlers.push(handler);
    }

    isItemSelected(item) {
        return this.props.selectedFilters.isSelected(item);
    }

    render() {
        return (
            <div>
                <div className="group group--lead search-wrapper">
                    <h3>Search filters</h3>
                    <input type="search" placeholder="Property" className="group__input input search__input" 
                        onChange={ (ev) => this._handleSearchInputChange(ev.target.value) } value={ this.searchTerm }
                        ref={ (el) => this._setInputElement(el) } onKeyDown={ this._handleSearchInputKeyDown } />
                </div>
                <FilterSearchSuggestions searchTerm={ this.searchTerm } matches={ this.matches } 
                    addSearchInputHandler={ this.addSearchInputHandler.bind(this) } 
                    isItemSelected={ this.isItemSelected.bind(this) }
                    selectItemHandler={ this.selectItemHandler.bind(this) } />
            </div>
        );
    }

}