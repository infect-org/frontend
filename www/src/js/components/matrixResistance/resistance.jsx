import React from 'react';
import resistanceTypes from '../../models/resistances/resistanceTypes';
import debug from 'debug';
import color from 'tinycolor2';
import getRelativeValue from '../../helpers/getRelativeValue';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

const log = debug('infect:ResistanceComponent');

@observer
class Resistance extends React.Component {

	_getTransformation() {
		if (!this.xPosition || !this.yPosition) return `translate(0,0)`;
		const left = this.xPosition.left;
		const top = this.yPosition.top;
		log('Resistance %o is placed at %d/%d', this.props.resistance, left, top);
		return `translate(${ left }px, ${ top }px)`;
	}

	@computed get xPosition() {
		const abView = this.props.matrix.getAntibioticView(this.props.resistance.resistance.antibiotic);
		return this.props.matrix.xPositions.get(abView);
	}

	@computed get yPosition() {
		const bactView = this.props.matrix.getBacteriumView(this.props.resistance.resistance.bacterium);
		return this.props.matrix.yPositions.get(bactView);
	}

	_getRadius() {
		const {min, max} = this.props.matrix.sampleSizeExtremes;
		return Math.round(getRelativeValue(this._getMostPreciseValue().sampleSize, min, max, 0.4) * 
			this.props.matrix.defaultRadius);
	}

	_getRelativeColorValue(value, min = 0, max = 1) {
		return min + (max - min) * value;
	}

	_getColor() {
		// Hue
		const bestValue = this._getMostPreciseValue().value;
		const hue = this._getRelativeColorValue(1 - bestValue, 9, 98) / 360;
		const saturation = this._getRelativeColorValue(1 - bestValue, 0.3, 1);
		const lightness = this._getRelativeColorValue(bestValue, 0.4, 0.9);

		return color.fromRatio({
			h: hue
			, s: saturation
			, l: lightness
		});
	}

	_getFontColor() {
		const fontColor = this._getColor();
		fontColor.darken(50);
		fontColor.saturate(20);
		return fontColor;
	}

	_getMostPreciseValue() {
		return this.props.resistance.resistance.getValuesByPrecision()[0];
	}

	/**
	* Return value that will be displayed in the resistance's circle. 
	* If import precision is given, use number, else use H/L/I.
	*/
	_getValue() {
		const bestValue = this._getMostPreciseValue();
		if (bestValue.type.identifier === resistanceTypes.class.identifier || 
			bestValue.type.identifier === resistanceTypes.default.identifier) {
			return bestValue.value < 1/3 ? 'L' : (bestValue.value < 2/3 ? 'I' : 'H');
		}
		// If bestValue is 1, return 1, else .xx (without leading 0)
		return bestValue.value === 1 ? 1 : (bestValue.value.toFixed(2) + '').substr(1);
	}

	_getOpacity() {
		return this.xPosition && this.yPosition ? 1 : 0;
	}

	render() {
		return(
			// Radius: sample size
			// Color: Resistance (for given population filters)
			<g style={{transform: this._getTransformation()}} className="resistanceMatrix__resistance" opacity={this._getOpacity()} 
				data-antibiotic={this.props.resistance.resistance.antibiotic.name}
				data-bacterium={this.props.resistance.resistance.bacterium.name}>
				{/* circle: center is at 0/0, therefore move by radius/radius */}
				<circle r={this._getRadius()} fill={this._getColor()} className="resistanceMatrix__resistanceCircle"
					cx={this.props.matrix.defaultRadius} cy={this.props.matrix.defaultRadius}>
				</circle>
				<text x={this.props.matrix.defaultRadius} y={this.props.matrix.defaultRadius} textAnchor="middle" 
					fill={this._getFontColor()}
					dominantBaseline="central" className="resistanceMatrix__resistanceText">
					{Math.round(this._getValue() * 100)}
				</text>
			</g>
		);
	}

}

export default Resistance;