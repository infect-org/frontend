import React from 'react';
import { observer } from 'mobx-react';
import { computed, observable, when, action } from 'mobx';
import getVisibilityClassModifier from '../../helpers/getVisibilityClassModifier';


@observer
export default class BacteriumLabel extends React.Component {

	@observable _firstFilterSelected = false;

	constructor() {
		super();
		this._wasVisible = true;
	}

	componentDidMount() {
		this._setupResizeWatcher();
	}

	componentWillReceiveProps(nextProps) {
		// Only add classes with animations when user filters for the first time. 
		// We dont want them while the app is setting up. 
		when(() => nextProps.selectedFilters.originalFilters.length > 0, () => {
			action(() => this._firstFilterSelected = true)();
		});
	}

	@computed get visible() {
		// Don't display bacterium when we are still measuring its width 
		return this.props.matrix.defaultRadius !== undefined && this.props.bacterium.visible;		
	}

	@computed get classModifier() {
		if (!this._firstFilterSelected) return '';
		// We must also be watching transitions: If not, we only watch visible – which stays the
		// same when modifier should change from -was-hidden-is-visible to -was-visible-is-visible
		// and therefore won't call an update.
		this.transformation;
		const modifier = getVisibilityClassModifier(this.visible, this._wasVisible);
		this._wasVisible = this.visible;
		return modifier;
	}

	_getPreviousPosition() {
		return `translate(${ (this._previousPosition && this._previousPosition.left) || 0 }, 
			${ (this._previousPosition && this._previousPosition.top) || 0 })`;
	}

	@computed get transformation() {
		// We can only position elements correctly when we know defaultRadius. Until then, 
		// hide the labels
		if (!this.props.matrix.defaultRadius) return this._getPreviousPosition();
		if (!this.visible) return this._getPreviousPosition();
		// Top: top of bacterium plus radius (baseline corresponds to the center of the circles)
		const pos = this.props.matrix.yPositions.get(this.props.bacterium);
		// If pos is not available (because bacterium is hidden) return previous top – we don't want to move
		// labels if not necessary (as they're invisible; performance)
		const top = pos ? pos.top : this._previousTop;
		this._previousPosition = { left: 0, top: top };
		return `translate(0, ${ top })`;
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

	@computed get highlightClass() {
		const activeResistance = this.props.matrix.activeResistance;
		if (!activeResistance) return '';
		return this.props.bacterium.bacterium === activeResistance.resistance.bacterium ? 'highlight' : '';
	}

	render() {
		return (
			<g transform={ this.transformation }
				className={ 'resistanceMatrix__bacteriumLabel ' + this.classModifier }>
				/* rect is only used to give the g a height so that text can be aligned middle */
				/* We have to place label to the right (x) in order for text-anchor to work. */
				<text x={this.props.matrix.defaultRadius} y={this.props.matrix.defaultRadius} 
					ref={(el) => this._setTextElement(el)} x={this.props.matrix.bacteriumLabelColumnWidth} 
					className={ 'resistanceMatrix__bacteriumLabelText ' + this.highlightClass } 
					dominantBaseline="middle" y={this.props.matrix.defaultRadius}>
					{this.props.bacterium.bacterium.name}
				</text>
			</g>
		);
	}

}