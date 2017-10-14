import React from 'react';
import debug from 'debug';
import color from 'tinycolor2';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { supportsDominantBaseline } from '../../helpers/svgPolyfill';

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

	_getTransformation() {
		const left = (this.props.substanceClass.xPosition ? this.props.substanceClass.xPosition.left : 0);
		if (isNaN(left)) return 'translate(0,0)';
		const parentCount = this.props.substanceClass.substanceClass.getParentSubstanceClasses().length;
		const top = this.props.matrix.antibioticLabelRowHeight + 
			(this.props.matrix.maxAmountOfSubstanceClassHierarchies - parentCount - 1) * 
			(this.props.matrix.greatestSubstanceClassLabelHeight || 0) +
			this.props.matrix.space;
		if (isNaN(top)) return 'translate(0,0)';
		log('Position for %o is %d/%d', this.props.substanceClass, left, top);
		return `translate(${ left }, ${ top })`;
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
		const xPos = this.props.substanceClass.xPosition;
		if (!xPos || isNaN(xPos.right) || isNaN(xPos.left)) return 0;
		return xPos.right - xPos.left;
	}

	_getHeaderLineHeight() {
		return this.props.matrix.greatestSubstanceClassLabelHeight;
	}

	_getOpacity() {
		return this.props.substanceClass.xPosition ? 1 : 0;
	}

	_getFillColor() {
		const scColor = this.props.substanceClass.substanceClass.color;
		if (!scColor) return 'rgb(255, 255, 255)';
		const split = scColor.split(/\s*\/\s*/);
		if (split.length !== 3) throw new Error(`SubstanceClassComponent: RGB color must consist of three parts, ${ scColor } is not valid.`);
		const tinyColor = color({ r: split[0], g: split[1], b: split[2] });
		tinyColor.setAlpha(0.3);
		return tinyColor;
	}

	render() {
		return (
			<g transform={ this._getTransformation() } className="resistanceMatrix__substanceClassLabel" opacity={ this._getOpacity() }>
				{ /* use textPath to truncate text of substanceClass */ }
				<defs>
					<path id={ 'substance-class-' + this.props.substanceClass.substanceClass.id + '-path' } 
						d={ `M ${ this.props.matrix.space } ${ this.props.matrix.space } L ${ this._getMaxWidth() } ${ this.props.matrix.space }` }>
					</path>
				</defs>
				{ /* Background */}
				<rect width={ this._getMaxWidth() } height={ this._getHeaderLineHeight() || 0 } fill={ this._getFillColor() }></rect>
				{ /* Line above substanceClass */ }
				<rect width={ this._getMaxWidth() } height={ this._lineWeight } fill={ this.props.substanceClass.lineColor } 
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--top"></rect>
				{ /* Line left of substanceClass (head) */ }
				<rect width={ this._lineWeight } height={ this._getHeaderLineHeight() || 0 } fill={ this.props.substanceClass.lineColor }
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--left-header"></rect>
				<text className="resistanceMatrix__substanceClassLabelText" dominantBaseline="hanging" 
					dy={ supportsDominantBaseline(0, '0.8em') }
					transform="translate(0, 2)" ref={ (el) => this._setTextElement(el) }>
					<textPath xlinkHref={ '#substance-class-' + this.props.substanceClass.substanceClass.id + '-path' }>
						{ this.props.substanceClass.substanceClass.name }
					</textPath>
				</text>
			</g>
		);
	}

}