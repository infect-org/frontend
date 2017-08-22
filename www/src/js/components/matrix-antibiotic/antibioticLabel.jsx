import React from 'react';
import {observer} from 'mobx-react';

@observer
export default class AntibioticLabel extends React.Component {

	componentDidMount() {
		this._setupResizeListener();
	}

	_setTextElement(el) {
		this._textElement = el;
		this._setDimensions();
	}

	/**
	* Set height of view on model; needed as height is variable (because uf the 45° angle)
	* and space available for the matrix is calculated depending on the space that the highest 
	* label takes up.
	*/
	_setDimensions() {
		if (!this._textElement) return;
		const bounds = this._textElement.getBBox();
		// Element has a rotation of -45deg. Those are not respected in getBBox.
		// When rotated by 45°, take    sin(45°) * width   plus   the triangle below the baseline
		// that's a isosceles triangle
		const height = Math.ceil(bounds.width * Math.sin(Math.PI / 4) + Math.sqrt(Math.pow(bounds.height, 2)/2));
		this.props.antibiotic.setDimensions(height, height);
	}

	_getTransformation() {
		const left = this.props.matrix.xPositions.get(this.props.antibiotic).left;
		return `translate(${ left }px, ${ this.props.matrix.antibioticLabelRowHeight || 0 }px) rotate(-45deg)`;
	}

	_getOpacity() {
		return this.props.matrix.defaultRadius ? 1 : 0;
	}

	_setupResizeListener() {
		window.addEventListener('resize', () => this._setDimensions());
	}

	render() {
		return (
			<g style={{transform: this._getTransformation(), opacity: this._getOpacity()}}> // If missing, render will try to return an object literal (see next line)
				<text ref={(el) => this._setTextElement(el)}>{this.props.antibiotic.antibiotic.name}</text>
			</g>
		);
	}

}