import React from 'react';
import { observer } from 'mobx-react';

/**
 * Renders a filter item, i.e. a diagnosis (for a guideline) or a filter for the matrix.
 */
export default @observer class FilterSearchResult extends React.Component {

    render() {
        return (
            <li
                className={`group__list-item list-item result result--${this.props.item.type} ${this.props.isHighlighted ? 'result--active' : ''}`}
                onClick={this.props.item.toggle}
            >
                {/* Checkmark for selected filters */}
                <div
                    style={{ opacity: this.props.item.isSelected() ? 1 : 0 }}
                    className="result__checkmark"
                ></div>
                {/* Label */}
                <div className="label">
                    {this.props.item.render()}
                </div>
            </li>
        );
    }

}
