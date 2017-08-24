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
		if (!this._textElement) return 'translate(0, 0)';
		// We must add some of the height (60°/90°) as we rotated the label which positions it more to the left
		const left = this.props.matrix.xPositions.get(this.props.antibiotic).left + this._textElement.getBBox().height * 7.5/9;
		const substanceClassModifier = (this.props.matrix.maxAmountOfSubstanceClassHierarchies -
		 this.props.antibiotic.antibiotic.getSubstanceClasses().length);
		const top = (this.props.matrix.antibioticLabelRowHeight || 0) + 
			substanceClassModifier * (this.props.matrix.greatestSubstanceClassLabelHeight || 0);
		return `translate(${ left }px, ${ top }px) rotate(-75deg)`;
	}

	_getOpacity() {
		return this.props.matrix.defaultRadius ? 1 : 0;
	}

	_setupResizeListener() {
		window.addEventListener('resize', () => this._setDimensions());
	}

	render() {
		return (
			<g style={{transform: this._getTransformation(), opacity: this._getOpacity()}} className="resistanceMatrix__antibioticLabel">
				<text ref={(el) => this._setTextElement(el)} className="resistanceMatrix__antibioticLabelText">
					{this.props.antibiotic.antibiotic.name}
				</text>
			</g>
		);
	}

}