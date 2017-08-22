/**
* Wrapper around a resistance that can be extended with matrix
* view specific information.
*/
export default class ResistanceMatrixView {
	constructor(resistance, matrix) {
		this._matrixView = matrix;
		this.resistance = resistance;
	}
}