import React from 'react';

/**
* Higher order component that wrapps all filterLists (for ab, bact, etc.)
*/
export default function generateFilterList(Component) {

	return class extends React.Component {

		constructor() {
			super();
			this.translations = {
				bacteria: 'Filters for Bacteria'
				, antibiotics: 'Filters for Antibiotics'
				, population: 'Population Filters'
				, mostUsed: 'Favorites' 
				, data: 'Data Filters'
			};
		}

		render() {
			return (
                <div className="group group--padding" id={'js-filter-list-' + this.props.identifier }>
                    <h1>{ this.translations[this.props.identifier] }</h1>
					<Component {...this.props}/>
				</div>
			);
		}

	};

}