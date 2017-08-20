import React from 'react';
import {observer} from 'mobx-react';

@observer
export default class BacteriumLabel extends React.Component {

	componentDidMount() {
		this._setupResizeWatcher();
	}

	_getTransformation() {
		// We can only position elements correctly when we know defaultRadius. Until then, 
		// hide the labels
		if (!this.props.matrix.defaultRadius) return `translate(0, 0)`;
		// Top: top of bacterium plus ab label plus space between ab label the matrix that
		// corresponds to (space + radius).
		const top = this.props.matrix.yPositions.get(this.props.bacterium).top;
		return `translate(0, ${ top }px)`;
	}

	_getOpacity() {
		// Labels should be transparent as long as radius has not been calculated
		return this.props.matrix.defaultRadius ? 1 : 0;
	}

	_setTextElement(element) {
		if (!element) return;
		this._textElement = element;
		this._setWidth();
	}

	_setWidth() {
		this.props.bacterium.setWidth(this._textElement.getBBox().width);
	}

	_setupResizeWatcher() {
		window.addEventListener('resize', () => this._setWidth());
	}

	render() {
		return (
			<g style={{transform: this._getTransformation(), opacity: this._getOpacity()}}>
				<text ref={(el) => this._setTextElement(el)}>
					{this.props.bacterium.bacterium.name}
				</text>
			</g>
		);
	}

}