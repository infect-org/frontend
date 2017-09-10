import React from 'react';

/**
* Higher order component that wrapps all filterLists (for ab, bact, etc.)
*/
export default function generateFilterList(Component) {

	return class extends React.Component {

		render() {
			return (
                <div className="group">
                    <h1>Filter für {this.props.title}</h1>
					<Component {...this.props}/>
				</div>
			);
		}

	};

};