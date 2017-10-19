import React from 'react';
import AntibioticLabel from '../matrixAntibiotic/antibioticLabel';
import BacteriumLabel from '../matrixBacterium/bacteriumLabel';
import Resistance from '../matrixResistance/resistance';
import SubstanceClass from '../matrixSubstanceClass/substanceClass';
import ResistanceDetail from '../matrixResistance/resistanceDetail';
import SubstanceClassLine from '../matrixSubstanceClass/substanceClassLine';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
//import DevTools from 'mobx-react-devtools';

@observer
export default class Matrix extends React.Component {

	@observable yScrollPosition = 0;

	constructor() {
		super();
		// Space between label groups and matrix
		this._spaceBetweenGroups = 20;
		this._setupScrollListener();
	}

	componentDidMount() {
		this._setupResizeListener();
	}

	_setupScrollListener() {
		const el = document.querySelector('.main__matrix');
		el.addEventListener('scroll', (ev) => {
			this._currentYScrollPosition = el.scrollTop;
			if (!this._requestedAnimationFrame) {
				window.requestAnimationFrame(() => {
					this._setYScrollPosition(this._currentYScrollPosition);
					this._requestedAnimationFrame = undefined;
				});
			}
		});
	}

	@action _setYScrollPosition(position) {
		this.yScrollPosition = position;
	}

	/**
	* Returns height of the whole matrix
	*/
	_getHeight() {
		if (!this.props.matrix.defaultRadius) return 0;
		// Height: All bact labels + ab label + space between ab label and matrix (matrix.space + matrix.radius), 
		// see bacteriumLabel
		return this._getBodyHeight() + this._getEffectiveHeaderHeight();
	}

	_setSVG(element) {
		this._svg = element;
		this._setDimensions();
	}

	_setDimensions() {
		if (!this._svg) return;
		this.props.matrix.setDimensions(this._svg.getBoundingClientRect());
	}

	_setupResizeListener() {
		window.addEventListener('resize', () => this._setDimensions());
	}

	_getAntibioticLabelsTransformation() {
		const left = this._spaceBetweenGroups + this.props.matrix.bacteriumLabelColumnWidth;
		if (isNaN(left)) return 'translate(0,0)';
		return `translate(${ left }, 0)`;
	}

	_getBacteriaLabelsTransformation() {
		const top = this._getEffectiveHeaderHeight();
		if (isNaN(top)) return 'translate(0,0)';
		return `translate(0, ${ top })`;
	}

	_getMainMatrixTransformation() {
		const left = this.props.matrix.bacteriumLabelColumnWidth + this._spaceBetweenGroups;
		const top = this._getEffectiveHeaderHeight();
		return `translate(${ left }, ${ top })`;
	}

	/**
	* Returns height of the whole matrix header, i.e. antibiotics, substance classes and all spacing
	*/
	_getEffectiveHeaderHeight() {
		// this._spaceBetweenGroups / 2: Just add a small space between header and body
		return this.props.matrix.antibioticLabelRowHeight + this._spaceBetweenGroups / 2 +
			this.props.matrix.maxAmountOfSubstanceClassHierarchies * (this.props.matrix.greatestSubstanceClassLabelHeight || 0);
	}

	_substanceClassSortFunction(a, b) {
		return a.xPosition && b.xPosition ? b.xPosition.left - a.xPosition.left : 0;
	}

	/**
	* Returns height of the matrix' body (circles). 
	*/
	_getBodyHeight() {
		return (this.props.matrix.defaultRadius * 2 + this.props.matrix.space) * this.props.matrix.sortedVisibleBacteria.length;
	}

	render() {
		return(
				<svg ref={ (el) => this._setSVG(el) } style={ { height: this._getHeight() } } className="resistanceMatrix">

					{ /* Lines for substance classes in body */ }
					{ this.props.matrix.antibioticLabelRowHeight && 
						<g transform={ this._getMainMatrixTransformation() }>
							{ this.props.matrix.substanceClasses.map((sc) => 
								<SubstanceClassLine key={ sc.substanceClass.id } substanceClass={ sc } matrix={ this.props.matrix } bodyHeight={ this._getBodyHeight() }/>
							) }
						</g>
					}

					{ /* Bacteria labels */ }
					<g transform={ this._getBacteriaLabelsTransformation() } className="resistanceMatrix__bacteriaLabels">
						{ this.props.matrix.sortedBacteria.map((bact) => 
							<BacteriumLabel key={ bact.bacterium.id } bacterium={ bact } matrix={ this.props.matrix }/>
						) }
					</g>

					{ /* Resistances */ }
					{ /* Only render when radius is ready and after labels were drawn or we will have multiple re-renders */ }
					{ this.props.matrix.defaultRadius && this.props.matrix.antibioticLabelRowHeight && 
					<g transform={ this._getMainMatrixTransformation() } className="resistanceMatrix__resistances">
						{ /* Resistances */ }
						{ this.props.matrix.resistances.map((res) =>
							<Resistance key={res.resistance.antibiotic.id + '/' + res.resistance.bacterium.id} matrix={this.props.matrix} resistance={res}/>
						) }
						{ /* Resistance detail (hover) */ }
						{ this.props.matrix.activeResistance &&
							<ResistanceDetail resistance={ this.props.matrix.activeResistance } defaultRadius={ this.props.matrix.defaultRadius }/>
						}
					</g>
					}

					{ /* Matrix header */ }
					{ /* Must be at the bottom as its z-index must be highest (fixed when scrolling) */ }
					{ /* Must cover the whole width of the svg to hide everything behind it */ }
					<g className="resistanceMatrix__antibioticsLabels" transform={ `translate(0, ${ this.yScrollPosition || 0 })` }>

						{ /* White background (to hide things when header is sticky) */ }
						<rect x="0" y="0" height={ this._getEffectiveHeaderHeight() || 0 } width="100%" fill="rgb(255, 255, 255)"></rect>

						{ /* Header with labels */ }
						<g transform={ this._getAntibioticLabelsTransformation() }>

							{ /* Antibiotic labels */ }
							{this.props.matrix.sortedAntibiotics.map((ab) => 
								<AntibioticLabel key={ ab.antibiotic.id } antibiotic={ ab } matrix={ this.props.matrix }/>
							)}

							{ /* Substance class labels */ }
							{ /* - Placed below antibiotics as z-index must be higher (if user hovers a shortened label)
								 - Sorted by xPosition (reverse): If user hovers a substanceClass left of the next, it must lie
							       above the right-next substance class */ }
							{this.props.matrix.substanceClasses.sort(this._substanceClassSortFunction).map((sc) => 
								<SubstanceClass key={ sc.substanceClass.id } substanceClass={ sc } matrix={ this.props.matrix }
									filters={ this.props.filters } selectedFilters={ this.props.selectedFilters }/>
							)}

						</g>
					</g>

				</svg>
		);
	}

}
