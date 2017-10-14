import React from 'react';
import { observer } from 'mobx-react';

/**
* Represents a vertical line in the matrix that holds substance classes apart
*/
@observer
export default class SubstanceClassLine extends React.Component {

	constructor() {
		super();
		this._lineWeight = 1;
	}

	render() {
		return (
			<rect width={ this._lineWeight } height={ this.props.bodyHeight || 0 } y="0"
				fill={ this.props.substanceClass.lineColor } x={ this.props.substanceClass.xPosition.left || 0 }
				className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--left-body">
				{ /* Set y to 0, will be covered by header */ }
			</rect>
		);
	}

}