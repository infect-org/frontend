import color from 'tinycolor2';
import { computed } from 'mobx';

class SubstanceClassMatrixView {

	constructor(substanceClass, matrixView) {
		this.substanceClass = substanceClass;
		this._matrixView = matrixView;
	}

	@computed get lineColor() {
		const parents = this.substanceClass.getParentSubstanceClasses().length;
		const rank = parents;
		const colorValue = color.fromRatio({
			h: 0
			, s: 0
			, l: rank / this._matrixView.maxAmountOfSubstanceClassHierarchies * 0.6 + 0.4
		});
		return colorValue;
	}

	@computed get xPosition() {
		return this._matrixView.xPositions.get(this);
	}

}

export default SubstanceClassMatrixView;

