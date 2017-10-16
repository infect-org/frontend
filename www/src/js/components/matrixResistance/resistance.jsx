import React from 'react';
import resistanceTypes from '../../models/resistances/resistanceTypes';
import debug from 'debug';
import getRelativeValue from '../../helpers/getRelativeValue';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { supportsDominantBaseline } from '../../helpers/svgPolyfill';

const log = debug('infect:ResistanceComponent');

@observer
class Resistance extends React.Component {

	_getTransformation() {
		const xPos = this.props.resistance.xPosition;
		const yPos = this.props.resistance.yPosition;
		if (!xPos || !yPos) return `translate(0,0)`;
		const left = xPos.left;
		const top = yPos.top;
		log('Resistance %o is placed at %d/%d', this, left, top);
		// IE11 does not know style: transform – use the transform attribute
		return `translate(${ left }, ${ top })`;
	}


	_getRadius() {
		const {min, max} = this.props.matrix.sampleSizeExtremes;
		return Math.round(getRelativeValue(this.props.resistance.mostPreciseValue.sampleSize, min, max, 0.4) * 
			this.props.matrix.defaultRadius);
	}

	/**
	* Return value that will be displayed in the resistance's circle. 
	* If import precision is given, use number, else use H/L/I.
	*/
	@computed get value() {
		const bestValue = this.props.resistance.mostPreciseValue;
		if (bestValue.type.identifier === resistanceTypes.class.identifier || 
			bestValue.type.identifier === resistanceTypes.default.identifier) {
			return bestValue.value < 1/3 ? 'L' : (bestValue.value < 2/3 ? 'I' : 'H');
		}
		// If bestValue is 1, return 1, else .xx (without leading 0)
		return bestValue.value === 1 ? 1 : (bestValue.value.toFixed(2) + '').substr(1);
	}


	_handleMouseEnter = (ev) => {
		this.props.matrix.setActiveResistance(this.props.resistance);
	}

	_handleMouseLeave = (ev) => {
		this.props.matrix.setActiveResistance(undefined);
	}

	render() {
		return(
			// Radius: sample size
			// Color: Resistance (for given population filters)
			<g transform={ this._getTransformation() } className="resistanceMatrix__resistance" 
				style={ { visibility: this.props.resistance.visible ? 'visible' : 'hidden' } }
				data-antibiotic={this.props.resistance.resistance.antibiotic.name}
				data-bacterium={this.props.resistance.resistance.bacterium.name}
				onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}
				>
				{/* circle: center is at 0/0, therefore move by radius/radius */}
				<circle r={this._getRadius()} fill={this.props.resistance.backgroundColor} className="resistanceMatrix__resistanceCircle"
					cx={this.props.matrix.defaultRadius} cy={this.props.matrix.defaultRadius}>
				</circle>
				<text x={this.props.matrix.defaultRadius} y={this.props.matrix.defaultRadius} textAnchor="middle" 
					fill={this.props.resistance.fontColor}
					dominantBaseline="central" className="resistanceMatrix__resistanceText"
					dy={ supportsDominantBaseline(0, '0.5em') }>
					{Math.round(this.value * 100)}
				</text>
			</g>
		);
	}

}

export default Resistance;