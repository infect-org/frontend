import {computed} from 'mobx';

class AntibioticMatrixView {

	constructor(antibiotic, matrixView) {
		this.antibiotic = antibiotic;
		this._matrixView = matrixView;
	}


	@computed get xPosition() {
		return this._matrixView.xPositions.get(this);
	}

	setHeight(height) {
		this._matrixView.setAntibioticLabelHeight(this, height);
	}

}

export default AntibioticMatrixView;