import React from 'react';
import debug from 'debug';
import color from 'tinycolor2';
import { observer } from 'mobx-react';
import { computed, observable, action, runInAction, when } from 'mobx';
import { supportsDominantBaseline } from '../../helpers/svgPolyfill';
import getVisibilityClassModifier from '../../helpers/getVisibilityClassModifier';

const log = debug('infect:SubstanceClassComponent');

@observer
export default class SubstanceClass extends React.Component {

	@observable _isHovered = false;
	@observable _afterHovered = false;

	constructor() {
		super();
		this._lineWeight = 1;
		this._wasVisible = true;
	}

	componentDidMount() {
		this._measureHeight();
		window.addEventListener('resize', () => this._measureHeight());
	}

	_getPreviousTransformation() {
		return `translate(${ (this._previousPosition && this._previousPosition.left) || 0 },
			${ this._previousPosition && this._previousPosition.top || 0 })`;
	}

	@computed get topTransformation() {
		const parentCount = this.props.substanceClass.substanceClass.getParentSubstanceClasses().length;
		const top = this.props.matrix.antibioticLabelRowHeight + 
			(this.props.matrix.maxAmountOfSubstanceClassHierarchies - parentCount - 1) * 
			(this.props.matrix.greatestSubstanceClassLabelHeight || 0) +
			this.props.matrix.space;
		return top;
	}

	@computed get transformation() {
		if (!this.visible) return this._getPreviousTransformation();
		const top = this.topTransformation;
		const left = this.props.substanceClass.xPosition.left;
		this._previousPosition = { left, top };
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
		// If label is invisible, don't change its width (and just return the previous value) 
		// to not mess with our animations.
		if (!xPos || isNaN(xPos.right) || isNaN(xPos.left)) return this._previousLabelWidth || 0;
		const minWidth = xPos.right - xPos.left;
		const width = this._afterHovered
			? Math.max(minWidth, this._getApproximateTextWidth()) + 2 * this.props.matrix.space 
			: minWidth;
		this._previousLabelWidth = width;
		return width;
	}

	@computed get headerLineHeight() {
		return this.props.matrix.greatestSubstanceClassLabelHeight;
	}

	/**
	* Model does not have a visible property. But: All invisible substance classes won't have a left
	* position (on matrixView). Use it to determine if substanceClass is visible or not.
	*/
	@computed get visible() {
		const left = this.props.substanceClass.xPosition && this.props.substanceClass.xPosition.left;
		return !isNaN(left) && left !== undefined;
	}

	@computed get classModifier() {
		// No animations before we are ready
		// We must also be watching transitions: If not, we only watch visible – which stays the
		// same when modifier should change from -was-hidden-is-visible to -was-visible-is-visible
		// and therefore won't call an update.
		this.transformation;
		const modifier = getVisibilityClassModifier(this.visible, this._wasVisible);
		this._wasVisible = this.visible;
		return modifier;
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
		tinyColor.brighten(40).desaturate(60);
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
			<g transform={ this.transformation } className={ 'resistanceMatrix__substanceClassLabel js-substance-class ' + this.classModifier }
				onMouseEnter={ (ev) => this._updateHoveredState(true) } onMouseLeave={ (ev) => this._updateHoveredState(false) }
				onClick={ (ev) => this._handleSubstanceClassClick() } >
				{ /* use textPath to truncate text of substanceClass */ }
				<defs>
					<path id={ 'substance-class-' + this.props.substanceClass.substanceClass.id + '-path' } 
						d={ `M 0 0 L ${ this._labelWidth - 5 } 0` }>
					</path>
				</defs>
				{ /* Background */}
				<rect width={ this._labelWidth } height={ this.headerLineHeight || 0 } fill={ this._getFillColor() }></rect>
				{ /* Line above substanceClass */ }
				<rect width={ this._labelWidth } height={ this._lineWeight } fill={ this.props.substanceClass.lineColor } 
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--top"></rect>
				{ /* Line left of substanceClass (head) */ }
				<rect width={ this._lineWeight } height={ this.headerLineHeight || 0 } fill={ this.props.substanceClass.lineColor }
					className="resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--left-header"></rect>
				<text className="resistanceMatrix__substanceClassLabelText" dominantBaseline="hanging" 
					dy={ supportsDominantBaseline('-2', '0.8em') }
					transform={ `translate(${ this.props.matrix.space }, ${ this.props.matrix.space})` } ref={ (el) => this._setTextElement(el) }>
					{ /* Not hovered: Crop text by applying a textPath */ }
					{ !this._isHovered && 
						<textPath xlinkHref={ '#substance-class-' + this.props.substanceClass.substanceClass.id + '-path' }
							 dominantBaseline="hanging">
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