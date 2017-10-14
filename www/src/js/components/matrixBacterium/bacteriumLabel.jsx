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
		// Top: top of bacterium plus radius (baseline corresponds to the center of the circles)
		const pos = this.props.matrix.yPositions.get(this.props.bacterium);
		// If pos is not available (because bacterium is hidden) return previous top – we don't want to move
		// labels if not necessary (as they're invisible; performance)
		const top = pos ? pos.top : this._previousTop;
		this._previousTop = top;
		return `translate(0, ${ top })`;
	}

	_getOpacity() {
		// Labels should be transparent as long as radius has not been calculated
		if (!this.props.matrix.defaultRadius) return 0;
		if (!this.props.bacterium.visible) return 0;
		return 1;
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

	_getHighlightClass() {
		const activeResistance = this.props.matrix.activeResistance;
		if (!activeResistance) return '';
		return this.props.bacterium.bacterium === activeResistance.resistance.bacterium ? 'highlight' : '';
	}

	render() {
		return (
			<g transform={ this._getTransformation() } style={ { opacity: this._getOpacity() } } className="resistanceMatrix__bacteriumLabel">
				/* rect is only used to give the g a height so that text can be aligned middle */
				/* We have to place label to the right (x) in order for text-anchor to work. */
				<text x={this.props.matrix.defaultRadius} y={this.props.matrix.defaultRadius} 
					ref={(el) => this._setTextElement(el)} x={this.props.matrix.bacteriumLabelColumnWidth} 
					className={ 'resistanceMatrix__bacteriumLabelText ' + this._getHighlightClass() } dominantBaseline="middle" 
					y={this.props.matrix.defaultRadius}>
					{this.props.bacterium.bacterium.name}
				</text>
			</g>
		);
	}

}