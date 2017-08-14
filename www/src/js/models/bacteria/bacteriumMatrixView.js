import {computed} from 'mobx';

export default class BacteriumMatrixView {

	constructor(bacterium, matrix) {
		this.bacterium = bacterium;
		this._matrix = matrix;
	}
	
	@computed get yPosition() {
		return this._matrix.yPositions[this];
	}

	setDimensions(dimensions) {
		if (!dimensions) return;
		this._matrix.setBacteriumLabelWidth(this, dimensions.width);
	}

}