import debug from 'debug';
import React from 'react';
import { observer } from 'mobx-react';
import { action, reaction, observable } from 'mobx';
import FilterSearchResult from './FilterSearchResult.jsx';

const log = debug('infect:FilterSearchSuggestions');

export default @observer class FilterSearchSuggestions extends React.Component {

    @observable selectedMatchIndex = 0;

    componentDidMount() {
        // Register handler for events on input in parent component
        this.props.addSearchInputHandler(this.handleSearchInputEvents.bind(this));
        // Reset index to 0 when matches change
        reaction(() => this.props.matches, () => { this.selectedMatchIndex = 0; });
    }


    /**
     * Handles keydown events on input
     * @param {KeyboardEvent} ev
     */
    handleSearchInputEvents(ev) {
        let eventHandled = true;
        if (ev.keyCode === 40) {
            // Down
            this.updateHighlightedResultRow(1);
        } else if (ev.keyCode === 38) {
            // Up
            this.updateHighlightedResultRow(-1);
        } else if (ev.keyCode === 13) {
            // Enter
            this.props.matches[this.selectedMatchIndex].toggle();
        } else {
            eventHandled = false;
        }
        if (eventHandled) ev.preventDefault();
    }


    /**
     * Change highlighted row
     * @param {Number} direction        -1 to select previous item, +1 to select next item
     */
    @action updateHighlightedResultRow(direction) {
        const nextHighlight = this.selectedMatchIndex + direction;
        if (nextHighlight < 0 || nextHighlight >= this.props.matches.length) return;
        this.selectedMatchIndex = nextHighlight;
    }

    /**
     * Returns true if row at index is currently highlighted (from arrow up/down keys)
     * @param  {Number} index
     * @return {Boolean}
     */
    isResultRowHighlighted(index) {
        return index === this.selectedMatchIndex;
    }


    render() {
        return (
            <div
                className={`group group--black-font search ${this.props.searchTerm === '' ? '' : 'search--visible'}`}
            >
                <ul
                    className="group__list group__list--vertical search__results"
                >
                    {this.props.matches.length > 0 && this.props.matches.map((item, index) => (
                        <FilterSearchResult
                            isHighlighted={this.isResultRowHighlighted(index)}
                            item={item}
                            key={item.key}
                        />
                    ))}
                    {/* No results found */}
                    {this.props.matches.length === 0 &&
                        <li
                            className="group__list-item list-item result"
                        >
                            <div className="label">
                                <p
                                    className="result__item label--small label--gray label--nomargin"
                                >
                                    Term: {this.props.searchTerm}
                                </p>
                                <p
                                    className="result__item label--bold label--larger label--nomargin"
                                >
                                    No guidelines or filters found
                                </p>
                            </div>
                        </li>
                    }
                </ul>
            </div>
        );
    }
}
