import React from 'react';
import { observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import FilterSearchSuggestions from './filterSearchSuggestions';
import debug from 'debug';
const log = debug('infect:FilterSearch');

export default @observer class FilterSearch extends React.Component {

    /**
     * Current search term that was typed into search input
     */
    @observable searchTerm = '';

    /**
     * Bound functions
     */
    handleSearchInputChange = this.handleSearchInputChange.bind(this);
    handleSearchInputKeyDown = this.handleSearchInputKeyDown.bind(this);

    /**
     * The result list must listen to keyboard events on <input> to e.g. select previous or next
     * element. searchInputHandlers contains functions that handle keyboard inputs.
     */
    searchInputHandlers = [];

    /**
     * Enrich matches with all information that is needed to render them. This saves us from passing
     * down logic to the component for a single search result.
     * @return {Object[]}   All matches with all information that is needed ot render and handle
     *                      them
     */
    @computed get matches() {

        // Matches for matrix
        const matrixMatches = this.props.searchMatrixFilters(this.searchTerm).slice(0, 10);
        log('Matrix matches are %o', matrixMatches);
        const enrichedMatrixMatches = matrixMatches.map(match => ({
            item: match,
            isSelected: () => this.props.isMatrixFilterSelected(match),
            render: () => {
                log('Render matrix filter item for %o', match);
                return (
                    <React.Fragment>
                        <p className="result__item label--small label--gray label--nomargin">
                            {match.property.entityType[0].toUpperCase() +
                                match.property.entityType.substr(1)}
                            &nbsp;–&nbsp;
                            {match.property.niceName}
                        </p>
                        <p className="result__item label--bold label--larger label--nomargin">
                            {match.niceValue}
                        </p>
                    </React.Fragment>
                );
            },
            toggle: () => {
                log('Toggle matrix filter %o', match);
                this.props.toggleMatrixFilter(match);
                this.resetSearchTerm();
            },
            key: `${match.property.entityType}-${match.property.name}-${match.value}`,
            type: 'matrix',
        }));

        // Matches for guidelines
        const guidelineMatches = this.props.searchGuidelineFilters(this.searchTerm).slice(0, 10);
        log('Guideline matches are %o', guidelineMatches);
        const enrichedGuidelineMatches = guidelineMatches.map(match => ({
            item: match,
            isSelected: () => this.props.guidelines &&
                this.props.guidelines.selectedGuideline &&
                this.props.guidelines.selectedGuideline.selectedDiagnosis === match.diagnosis,
            render: () => (
                <React.Fragment>
                    <p className="result__item label--small  label--gray label--nomargin">
                        Guideline – Diagnosis
                    </p>
                    <p className="result__item label--bold label--larger label--nomargin">
                        {match.name}
                    </p>
                    {/* If synonym was match (and not primary diagnosis name,
                        display it */}
                    {match.synonym &&
                        <p className="result__item label--small label--nomargin">
                            {match.synonym}
                        </p>
                    }
                </React.Fragment>
            ),
            toggle: () => {
                const selectedGuideline = this.props.guidelines &&
                    this.props.guidelines.selectedGuideline;
                // Only continue if guidelines are enabled and default guideline is selected. Must
                // be changed if UI supports multiple guidelines.
                if (selectedGuideline) {
                    // This diagnosis is already selected
                    if (selectedGuideline.selectedDiagnosis === match.diagnosis) {
                        selectedGuideline.selectDiagnosis();
                    } else {
                        selectedGuideline.selectDiagnosis(match.diagnosis);
                    }
                }
                this.resetSearchTerm();
            },
            key: match.diagnosis.id,
            type: 'guideline',
        }));

        const enrichedMatches = [...enrichedGuidelineMatches, ...enrichedMatrixMatches];
        log('Enriched matches are %o', enrichedMatches);
        return enrichedMatches;
    }

    @action handleSearchInputChange(ev) {
        const { value } = ev.target;
        log('Filter input changed to %s', value);
        this.searchTerm = value;
    }

    @action resetSearchTerm() {
        this.searchTerm = '';
        this.inputElement.focus();
    }

    /**
    * Store input element so that we can focus it after user selected an item.
    */
    setInputElement(el) {
        log('Input element set to %o', el);
        this.inputElement = el;
    }


    handleSearchInputKeyDown(ev) {
        // Escape
        if (ev.keyCode === 27) this.resetSearchTerm();
        // Call handler on suggestions component
        this.searchInputHandlers.forEach(handler => handler(ev));
    }

    /**
     * Add function to searchInputHandlers; will be called whenever an keydown events happens
     * on the search input. Needed to update highlighted matches on FilterSearchSuggestions
     * on arrow up/down.
     * @param {Function} handler     Event handler for keyDown
     */
    addSearchInputHandler(handler) {
        this.searchInputHandlers.push(handler);
    }

    render() {
        return (
            <div>
                <div className="group group--lead search-wrapper">
                    <h3>Search Guidelines or Filters</h3>
                    <input
                        type="search"
                        placeholder="Gram+, Pneumonia, …"
                        className="group__input input search__input js-filter-search-input"
                        onChange={this.handleSearchInputChange}
                        value={this.searchTerm}
                        ref={el => this.setInputElement(el)}
                        onKeyDown={this.handleSearchInputKeyDown}
                    />
                </div>
                <FilterSearchSuggestions
                    matches={this.matches}
                    searchTerm={this.searchTerm}
                    addSearchInputHandler={this.addSearchInputHandler.bind(this)}
                />
            </div>
        );
    }

}
