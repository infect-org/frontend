import {computed} from 'mobx';

class AntibioticMatrixView {

	constructor(antibiotic, matrixView) {
		this.antibiotic = antibiotic;
		this._matrixView = matrixView;
	}

	setDimensions(width, height) {
		this._matrixView.setAntibioticLabelDimensions(this, width, height);
	}

}

export default AntibioticMatrixView;