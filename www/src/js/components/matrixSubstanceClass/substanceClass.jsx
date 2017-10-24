import React from 'react';
import debug from 'debug';
import color from 'tinycolor2';
import { observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import { supportsDominantBaseline } from '../../helpers/svgPolyfill';

const log = debug('infect:SubstanceClassComponent');

@observer
export default class SubstanceClass extends React.Component {

	@observable _isHovered = false;
	@observable _afterHovered = false;

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

	/**
	* Returns the label's width, which is
	* - the substanceClasse's right x - left x position when not hovered
	* - the label text's full width when hovered
	* See _updateHovereState
	*/
	@computed get _labelWidth() {
		const xPos = this.props.substanceClass.xPosition;
		if (!xPos || isNaN(xPos.right) || isNaN(xPos.left)) return 0;
		const minWidth = xPos.right - xPos.left;
		const width = this._afterHovered
			? Math.max(minWidth, this._getApproximateTextWidth()) + 2 * this.props.matrix.space 
			: minWidth;
		return width;
	}

	_getHeaderLineHeight() {
		return this.props.matrix.greatestSubstanceClassLabelHeight;
	}

	_getOpacity() {
		return this.props.substanceClass.xPosition ? 1 : 0;
	}

	_getApproximateTextWidth() {
		return this._textElement.getBBox().width;
	}


	@action _updateAfterHoveredState(hovered) {
		this._afterHovered = hovered;
	}

	/**
	* When user hovers a label, we must 
	* - first remove the label's cropping (which is done through a textPath)
	* - then measure the whole uncropped label
	* - then update the background and line rects accordingly (width of the whole label)
	* To do so, we first set the _isHovered state to true which displays the label, then
	* with a timeout, set the _afterHovered state. When the _afterHovered state is changed,
	* the label already has the full width and can therefore be measured.
	*/
	@action _updateHoveredState(hovered) {
		this._isHovered = hovered;
		setTimeout(() => this._updateAfterHoveredState(hovered), 0 );
	}

	_getFillColor() {
		const scColor = this.props.substanceClass.substanceClass.color;
		if (!scColor) return 'rgb(255, 255, 255)';
		const tinyColor = color({ r: scColor.r, g: scColor.g, b: scColor.b });
		// Don't use opacity as bg serves as an overlay when user hovers the label
		tinyColor.brighten(40).desaturate(40);
		return tinyColor;
	}

	/**
	* Handler for click on a substance class: Add it to the filters
	*/
	_handleSubstanceClassClick(substanceClass) {
		const filters = this.props.filters.getValuesForProperty('substanceClass', 'name');
		const filter = filters.find((item) => item.value === this.props.substanceClass.substanceClass.name);
		log('Clicked on substance class; corresponding filter is %o', filter);
		if (this.props.selectedFilters.isSelected(filter)) this.props.selectedFilters.removeFilter(filter);
		else this.props.selectedFilters.addFilter(filter);
	}



	render() {
		return (
			<g transform={ this._getTransformation() } className="resistanceMatrix__substanceClassLabel" opacity={ this._getOpacity() }
				onMouseEnter={ (ev) => this._updateHoveredState(true) } onMouseLeave={ (ev) => this._updateHoveredState(false) }
				onClick={ (ev) => this._handleSubstanceClassClick() } >
				{ /* use textPath to truncate text of substanceClass */ }
				<defs>
					<path id={ 'substance-class-' + this.props.substanceClass.substanceClass.id + '-path' } 
						d={ `M 0 0 L ${ this._labelWidth - 5 } 0` }>
					</path>
				</defs>
				{ /* Background */}
				<rect width={ this._labelWidth } height={ this._getHeaderLineHeight() || 0 } fill={ this._getFillColor() }></rect>
				{ /* Line above substanceClass */ }
				<rect width={ this._labelWidth } height={ this._lineWeight } fill={ this.props.substanceClass.lineColor } 
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--top"></rect>
				{ /* Line left of substanceClass (head) */ }
				<rect width={ this._lineWeight } height={ this._getHeaderLineHeight() || 0 } fill={ this.props.substanceClass.lineColor }
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--left-header"></rect>
				<text className="resistanceMatrix__substanceClassLabelText" dominantBaseline="hanging" 
					dy={ supportsDominantBaseline('-2', '0.8em') }
					transform={ `translate(${ this.props.matrix.space }, ${ this.props.matrix.space})` } ref={ (el) => this._setTextElement(el) }>
					{ /* Not hovered: Crop text by applying a textPath */ }
					{ !this._isHovered && 
						<textPath xlinkHref={ '#substance-class-' + this.props.substanceClass.substanceClass.id + '-path' }>
							{ this.props.substanceClass.substanceClass.name }
						</textPath>
					}
					{ /* Hovered: Don't crop text */ }
					{ this._isHovered && this.props.substanceClass.substanceClass.name }
				</text>
			</g>
		);
	}

}