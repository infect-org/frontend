import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import SubstanceClass from '../matrixSubstanceClass/substanceClass';
import AntibioticLabel from '../matrixAntibiotic/antibioticLabel';

/***
* Matrix header with labels for antibiotics and substance classes
*/
@observer
export default class MatrixHeader extends React.Component {

	@computed get headerTransformation() {
		return `translate(${ this.props.matrix.bacteriumLabelColumnWidth + this.props.matrix.spaceBetweenGroups }, 0)`;
	}

	_substanceClassSortFunction(a, b) {
		return a.xPosition && b.xPosition ? b.xPosition.left - a.xPosition.left : 0;
	}

	render() {
		return (

			<svg className="resistanceMatrix__header" style={ { height: this.props.matrix.headerHeight } } viewport-fill="white">

				{ /* White background (to hide things when header is sticky) */ }
				<rect x="0" y="0" height="100%" width="100%" fill="rgb(255, 255, 255)"></rect>

				{ this.props.matrix.bacteriumLabelColumnWidth && 
					<g>
						<g className="resistanceMatrix__antibioticsLabels" transform={ this.headerTransformation }>
		
							{ /* Matrix header */ }
							{ /* Must be at the bottom as its z-index must be highest (fixed when scrolling) */ }
							{ /* Must cover the whole width of the svg to hide everything behind it */ }

							{ /* Antibiotic labels */ }
							{this.props.matrix.sortedAntibiotics.map((ab) => 
								<AntibioticLabel key={ ab.antibiotic.id } antibiotic={ ab } matrix={ this.props.matrix }/>
							)}
						</g>

						<g transform={ this.headerTransformation }>
							{ /* Substance class labels */ }
							{ /* - Placed below antibiotics as z-index must be higher (if user hovers a shortened label)
								 - Sorted by xPosition (reverse): If user hovers a substanceClass left of the next, it must lie
							       above the right-next substance class */ }
							<g className="resistanceMatrix__substanceClassLabes">
								{this.props.matrix.substanceClasses.sort(this._substanceClassSortFunction).map((sc) => 
									<SubstanceClass key={ sc.substanceClass.id } substanceClass={ sc } matrix={ this.props.matrix }
										className="resistanceMatrix__substanceClassLabel"
										filters={ this.props.filters } selectedFilters={ this.props.selectedFilters }/>
								)}
							</g>

						</g>
					</g>
				}
			</svg>

		);
	}

}