import {computed} from 'mobx';

export default class BacteriumMatrixView {

	constructor(bacterium, matrix) {
		this.bacterium = bacterium;
		this._matrix = matrix;
	}
	
	setWidth(width) {
		if (!width) return;
		this._matrix.setBacteriumLabelWidth(this, width);
	}

}