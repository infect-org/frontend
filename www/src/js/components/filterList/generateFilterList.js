import React from 'react';

/**
* Higher order component that wrapps all filterLists (for antibiotics, bacteria, etc.) and adds
* a title and the necessary id (for scrolling through tabs).
*/
export default function generateFilterList(Component) {

    return class extends React.Component {

        constructor() {
            super();
            this.translations = {
                bacteria: 'Filters for Bacteria',
                antibiotics: 'Filters for Antibiotics',
                population: 'Population and Offsets',
                mostUsed: 'Favorites',
            };
        }

        render() {
            return (
                <div
                    className={`group group--padding group--${this.props.identifier}`}
                    id={`js-filter-list-${this.props.identifier}`}
                >
                    <h1>{this.translations[this.props.identifier]}</h1>
                    <Component {...this.props}/>
                </div>
            );
        }

    };

}
