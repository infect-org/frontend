import { computed } from 'mobx';
import doFiltersMatch from '../filters/doFiltersMatch';

/**
* Representation of an antibiotic in the matrix view. Holds e.g. a visible value as it does
* not apply to filters (where an ab is always visible), but only to the matrix.
*/
class AntibioticMatrixView {

	constructor(antibiotic, matrixView) {
		this.antibiotic = antibiotic;
		this._matrixView = matrixView;
	}

	setDimensions(width, height) {
		this._matrixView.setAntibioticLabelDimensions(this, width, height);
	}

	@computed get visible() {
		const abFilters = this._matrixView.selectedFilters.getFiltersByType('antibiotic');
		const visible = doFiltersMatch(this.antibiotic, abFilters);
		return visible;
	}

}

export default AntibioticMatrixView;