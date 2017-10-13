import color from 'tinycolor2';
import { computed } from 'mobx';
import debug from 'debug';

const log = debug('infect:ResistanceMatrixView');


/**
* Wrapper around a resistance that can be extended with matrix
* view specific information.
*/
export default class ResistanceMatrixView {
	
	constructor(resistance, matrix) {
		this._matrixView = matrix;
		this.resistance = resistance;
	}

	_getRelativeColorValue(value, min = 0, max = 1) {
		return min + (max - min) * value;
	}

	@computed get mostPreciseValue() {
		return this.resistance.getValuesByPrecision()[0];
	}

	@computed get backgroundColor() {
		const bestValue = this.mostPreciseValue.value;
		const hue = this._getRelativeColorValue(1 - bestValue, 9, 98) / 360;
		const saturation = this._getRelativeColorValue(1 - bestValue, 0.3, 1);
		const lightness = this._getRelativeColorValue(bestValue, 0.4, 0.9);
		return color.fromRatio({
			h: hue
			, s: saturation
			, l: lightness
		});
	}

	get fontColor() {
		const fontColor = this.backgroundColor.clone();
		fontColor.darken(50);
		fontColor.saturate(20);
		return fontColor;
	}

	@computed get xPosition() {
		const abView = this._matrixView.getAntibioticView(this.resistance.antibiotic);
		return this._matrixView.xPositions.get(abView);
	}

	@computed get yPosition() {
		const bactView = this._matrixView.getBacteriumView(this.resistance.bacterium);
		return this._matrixView.yPositions.get(bactView);
	}


}