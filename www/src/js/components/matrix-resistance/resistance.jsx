import React from 'react';

class Resistance extends React.Component {

	componentWillReceiveProps(next) {
		console.error(next);
	}

	render() {
		return(
			// Radius: sample size
			// Color: Resistance (for given population filters)
			<circle r={this.props.matrix.radius} fill="tomato" cx="100" cy="100">
				<text>{this.props.resistance.value}</text>
			</circle>
		);
	}

}

export default Resistance;