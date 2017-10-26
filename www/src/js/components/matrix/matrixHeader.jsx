import React from 'react';
import { observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import SubstanceClass from '../matrixSubstanceClass/substanceClass';
import AntibioticLabel from '../matrixAntibiotic/antibioticLabel';

/***
* Matrix header with labels for antibiotics and substance classes
*/
@observer
export default class MatrixHeader extends React.Component {

	@observable _leftScrollPosition = 0;

	componentDidMount() {
		const parentScrollElement = document.querySelector('.resistanceMatrix');
		parentScrollElement.addEventListener('scroll', () => {
			this._updateScrollLeftPosition(parentScrollElement.scrollLeft);
		});
	}

	@action _updateScrollLeftPosition(amount) {
		this._leftScrollPosition = amount;
	}

	@computed get headerTransformation() {
		return `translate(${ this.props.matrix.bacteriumLabelColumnWidth + this.props.matrix.spaceBetweenGroups }, 0)`;
	}

	@computed get headerScrollTransformation() {
		return `translate(${ this._leftScrollPosition * -1 }px, 0)`;
	}

	@computed get sortedSubstanceClasses() {
		// We have to use a function that depends on non-changing properties *or* 
		// DOM will be updated (which we don't want or need) and wich destroys our nice
		// animations
		return this.props.matrix.substanceClasses.slice(0).sort((a, b) => {
			return a.substanceClass.order > b.substanceClass.order ? -1 : 1;
		});
	}

	render() {
		// Only display (unhide) when radius is calculated (which needs the labels to be rendered first).
		return (
			<svg className={ 'resistanceMatrix__header ' + (this.props.selectedFilters.filterChanges > 0 ? '-with-transitions' : '-no-transitions') }
				style={ { height: this.props.matrix.headerHeight, transform: this.headerScrollTransformation, 
				visibility: (this.props.matrix.defaultRadius === undefined ? 'hidden' : 'visible') } }>

				{ /* White background (to hide things when header is sticky) */ }
				<rect x="0" y="0" height="100%" width="100%" fill="rgb(255, 255, 255)"></rect>
				{ /* Render ab labels early to measure them which is needed to calculate defaultRadius */ }
				{ this.props.matrix.bacteriumLabelColumnWidth !== undefined && 
					<g>
						<g className="resistanceMatrix__antibioticsLabels" transform={ this.headerTransformation }>
							{ /* Antibiotic labels */ }
							{this.props.matrix.sortedAntibiotics.map((ab) => 
								<AntibioticLabel key={ ab.antibiotic.id } antibiotic={ ab } matrix={ this.props.matrix }/>
							)}
						</g>

						{ /* Only display substance classes when defaultRadius is known and position can be calculated 
						     to prevent unnecessary updates */}
						{ this.props.matrix.defaultRadius !== undefined &&
							<g transform={ this.headerTransformation }>
								{ /* Substance class labels */ }
								{ /* - Placed below antibiotics as z-index must be higher (if user hovers a shortened label)
									 - Sorted by xPosition (reverse): If user hovers a substanceClass left of the next, it must lie
								       above the right-next substance class */ }
								<g className="resistanceMatrix__substanceClassLabes">
									{this.sortedSubstanceClasses.map((sc) => 
										<SubstanceClass key={ sc.substanceClass.id } substanceClass={ sc } matrix={ this.props.matrix }
											className="resistanceMatrix__substanceClassLabel"
											filters={ this.props.filters } selectedFilters={ this.props.selectedFilters }/>
									)}
								</g>

							</g>
						}
					</g>
				}
			</svg>

		);
	}

}