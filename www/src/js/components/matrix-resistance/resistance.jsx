import React from 'react';
import resistanceTypes from '../../models/resistances/resistanceTypes';
import debug from 'debug';
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

	/**
	* Return value that will be displayed in the resistance's circle. 
	* If import precision is given, use number, else use H/L/I.
	*/
	_getValue() {
		const sortedValues = this.props.resistance.resistance.getValuesByPrecision();
		const bestValue = sortedValues[0];
		if (bestValue.type.identifier === resistanceTypes.class.identifier || 
			bestValue.type.identifier === resistanceTypes.default.identifier) {
			return bestValue.value < 1/3 ? 'L' : (bestValue.value < 2/3 ? 'I' : 'H');
		}
		return bestValue.value.toFixed(2);
	}

	render() {
		return(
			// Radius: sample size
			// Color: Resistance (for given population filters)
			<g style={{transform: this._getTransformation()}}>
				<circle r={Math.floor(this.props.matrix.defaultRadius)} fill="tomato"></circle>
				<text textAnchor="middle" alignmentBaseline="central">{this._getValue()}</text>
			</g>
		);
	}

}

export default Resistance;