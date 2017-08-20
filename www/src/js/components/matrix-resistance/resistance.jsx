import React from 'react';
import resistanceTypes from '../../models/resistances/resistanceTypes';
import debug from 'debug';
import color from 'tinycolor2';
import getRelativeValue from '../../helpers/getRelativeValue';
const log = debug('infect:ResistanceComponent');

class Resistance extends React.Component {

	_getTransformation() {
		const abView = this.props.matrix.getAntibioticView(this.props.resistance.resistance.antibiotic);
		const bactView = this.props.matrix.getBacteriumView(this.props.resistance.resistance.bacterium);
		const left = this.props.matrix.xPositions.get(abView).left;
		const top = this.props.matrix.yPositions.get(bactView).top;
		log('Resistance %o is placed at %d/%d', this.props.resistance, left, top);
		return `translate(${ left }px, ${ top }px)`;
	}

	_getRadius() {
		const {min, max} = this.props.matrix.sampleSizeExtremes;
		return getRelativeValue(this._getMostPreciseValue().sampleSize, min, max, 0.4) * 
			this.props.matrix.defaultRadius;
	}

	_getRelativeColorValue(value, min = 0, max = 1) {
		return min + (max - min) * value;
	}

	_getColor() {
		// Hue
		const bestValue = this._getMostPreciseValue().value;
		const hue = this._getRelativeColorValue(1 - bestValue, 9, 98) / 360;
		const saturation = this._getRelativeColorValue(1 - bestValue, 0.4, 1);
		const lightness = this._getRelativeColorValue(bestValue, 0.4, 0.8);

		return color.fromRatio({
			h: hue
			, s: saturation
			, l: lightness
		});
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

	render() {
		return(
			// Radius: sample size
			// Color: Resistance (for given population filters)
			<g style={{transform: this._getTransformation()}}>
				<circle r={this._getRadius()} fill={this._getColor()}></circle>
				<text textAnchor="middle" alignmentBaseline="central">{this._getValue()}</text>
			</g>
		);
	}

}

export default Resistance;