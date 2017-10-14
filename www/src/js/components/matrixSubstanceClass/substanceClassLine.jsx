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

	_getLeftPosition() {
		return this.props.substanceClass.xPosition ? (this.props.substanceClass.xPosition.left || 0) : 0;
	}

	_getOpacity() {
		return this.props.substanceClass.xPosition ? 1 : 0;
	}

	render() {
		return (
			<rect width={ this._lineWeight } height={ this.props.bodyHeight || 0 } y="0" style={ { opacity: this._getOpacity() } }
				fill={ this.props.substanceClass.lineColor } x={ this._getLeftPosition() }
				className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--left-body">
				{ /* Set y to 0, will be covered by header */ }
			</rect>
		);
	}

}