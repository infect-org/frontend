import React from 'react';
import debug from 'debug';
import color from 'tinycolor2';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

const log = debug('infect:SubstanceClassComponent');

@observer
export default class SubstanceClass extends React.Component {

	constructor() {
		super();
		this._lineWeight = 1;
	}

	componentDidMount() {
		this._measureHeight();
		window.addEventListener('resize', () => this._measureHeight());
	}

	@computed get xPosition() {
		return this.props.matrix.xPositions.get(this.props.substanceClass);
	}

	_getTransformation() {
		const left = (this.xPosition ? this.xPosition.left : 0);
		const parentCount = this.props.substanceClass.substanceClass.getParentSubstanceClasses().length;
		const top = this.props.matrix.antibioticLabelRowHeight + 
			(this.props.matrix.maxAmountOfSubstanceClassHierarchies - parentCount - 1) * 
			(this.props.matrix.greatestSubstanceClassLabelHeight || 0) +
			this.props.matrix.space;
		log('Position for %o is %d/%d', this.props.substanceClass, left, top);
		return `translate(${ left }px, ${ top }px)`;
	}

	_setTextElement(el) {
		if (!el) return;
		this._textElement = el;
	}

	_measureHeight() {
		if (!this._textElement) {
			log(`SubstanceClass: Element not set, cannot get height.`);
			return;
		}
		// TODO: Use clipping path – so we can measure text's height
		const style = window.getComputedStyle(this._textElement);
		let height = Math.ceil(parseFloat(style.fontSize));
		// add line + space between line and text + space below text
		height += this._lineWeight + this.props.matrix.space * 2;
		this.props.matrix.setSubstanceClassHeight(this.props.substanceClass, height);
	}

	_getMaxWidth() {
		const xPos = this.xPosition;
		if (!xPos || isNaN(xPos.right) || isNaN(xPos.left)) return 0;
		return xPos.right - xPos.left;
	}

	_getHeaderLineHeight() {
		//return (parents + 1) * this.props.matrix.greatestSubstanceClassLabelHeight;
		return this.props.matrix.greatestSubstanceClassLabelHeight;
	}

	_getBodyLineTop() {
		const parents = this.props.substanceClass.substanceClass.getParentSubstanceClasses().length;
		return (parents + 1) * (this.props.matrix.greatestSubstanceClassLabelHeight || 0);
	}

	_getLineColor() {
		const parents = this.props.substanceClass.substanceClass.getParentSubstanceClasses().length;
		//const rank = this.props.matrix.maxAmountOfSubstanceClassHierarchies - parents;
		const rank = parents;
		const colorValue = color.fromRatio({
			h: 0
			, s: 0
			, l: rank / this.props.matrix.maxAmountOfSubstanceClassHierarchies * 0.6 + 0.4
		});
		//console.error(colorValue.toHex());
		//return '#' + colorValue.toHex();
		return colorValue;
	}

	_getOpacity() {
		return this.xPosition ? 1 : 0;
	}

	render() {
		return (
			<g style={{ transform: this._getTransformation() }} className="resistanceMatrix__substanceClassLabel" opacity={this._getOpacity()}>
				{/* use textPath to truncate text of substanceClass */}
				<defs>
					<path id={'substance-class-' + this.props.substanceClass.substanceClass.id + '-path'} 
						d={`M ${ this.props.matrix.space } ${ this.props.matrix.space } L ${ this._getMaxWidth() } ${ this.props.matrix.space }`}>
					</path>
				</defs>
				<rect width={ this._getMaxWidth() } height={ this._lineWeight } fill={ this._getLineColor() } 
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--top"></rect>
				<rect width={ this._lineWeight } height={ this._getHeaderLineHeight()} fill={ this._getLineColor() }
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--left-header"></rect>
				 	{/*y={ this.props.matrix.space } x={ this.props.matrix.space } */}
				 <rect width={ this._lineWeight } height="2000" y={ this._getBodyLineTop() } fill={ this._getLineColor() }
				 	className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--left-body"></rect>
				<text className="resistanceMatrix__substanceClassLabelText" dominantBaseline="hanging" 
					style={{ transform: 'translateY(2px)' }} ref={(el) => this._setTextElement(el)}>
					<textPath xlinkHref={'#substance-class-' + this.props.substanceClass.substanceClass.id + '-path'}>
						{this.props.substanceClass.substanceClass.name}
					</textPath>
				</text>
			</g>
		);
	}

}