import React from 'react';

class Resistance extends React.Component {

	_getPosition() {
		
	}

	render() {
		return(
			// Radius: sample size
			// Color: Resistance (for given population filters)
			<circle r="20">
				<text>{this.props.resistance.resistance}</text>
			</circle>
		);
	}

}

export default Resistance;