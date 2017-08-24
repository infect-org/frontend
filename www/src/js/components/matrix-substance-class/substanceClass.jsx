import React from 'react';
import debug from 'debug';
const log = debug('infect:SubstanceClassComponent');

export default class SubstanceClass extends React.Component {

	constructor() {
		super();
		this._lineWeight = 1;
	}

	componentDidMount() {
		this._measureHeight();
		window.addEventListener('resize', () => this._measureHeight());
	}

	_getTransformation() {
		const left = this.props.matrix.xPositions.get(this.props.substanceClass).left;
		const parentCount = this.props.substanceClass.substanceClass.getParentSubstanceClasses().length;
		const top = this.props.matrix.antibioticLabelRowHeight + 
			(this.props.matrix.maxAmountOfSubstanceClassHierarchies - parentCount - 1) * 
			(this.props.matrix.greatestSubstanceClassLabelHeight || 0) +
			this.props.matrix.space;
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
		const xPos = this.props.matrix.xPositions.get(this.props.substanceClass);
		if (isNaN(xPos.right) || isNaN(xPos.left)) return 0;
		return xPos.right - xPos.left;
	}

	render() {
		return (
			<g style={{ transform: this._getTransformation() }} className="resistanceMatrix__substanceClassLabel">
				{/* use textPath to truncate text of substanceClass */}
				<defs>
					<path id={'substance-class-' + this.props.substanceClass.substanceClass.id + '-path'} 
						d={`M ${ this.props.matrix.space } ${ this.props.matrix.space } L ${ this._getMaxWidth() } ${ this.props.matrix.space }`}>
					</path>
				</defs>
				<rect x="0" y="0" width={ this._getMaxWidth() } height={ this._lineWeight } 
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--top"></rect>
				<rect x="0" y="0" width={ this._lineWeight } height="2000" 
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--left"></rect>
				 	{/*y={ this.props.matrix.space } x={ this.props.matrix.space } */}
				<text
					className="resistanceMatrix__substanceClassLabelText" dominantBaseline="hanging"
					ref={(el) => this._setTextElement(el)}>
					<textPath xlinkHref={'#substance-class-' + this.props.substanceClass.substanceClass.id + '-path'}>
						{this.props.substanceClass.substanceClass.name}
					</textPath>
				</text>
			</g>
		);
	}

}