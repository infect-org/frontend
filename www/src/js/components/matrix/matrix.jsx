import React from 'react';
import AntibioticLabel from '../matrixAntibiotic/antibioticLabel';
import BacteriumLabel from '../matrixBacterium/bacteriumLabel';
import Resistance from '../matrixResistance/resistance';
import SubstanceClass from '../matrixSubstanceClass/substanceClass';
import ResistanceDetail from '../matrixResistance/resistanceDetail';
import {observer} from 'mobx-react';
//import DevTools from 'mobx-react-devtools';

@observer
export default class Matrix extends React.Component {

	constructor() {
		super();
		// Space between label groups and matrix
		this._spaceBetweenGroups = 20;
	}

	componentDidMount() {
		this._setupResizeListener();
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
		return `translate(${ left }px, 0)`;
	}

	_getBacteriaLabelsTransformation() {
		const top = this._getEffectiveHeaderHeight();
		return `translate(0, ${ top }px)`;
	}

	_getMainMatrixTransformation() {
		const left = this.props.matrix.bacteriumLabelColumnWidth + this._spaceBetweenGroups;
		const top = this._getEffectiveHeaderHeight();
		return `translate(${ left }px, ${ top }px)`;
	}

	/**
	* Returns height of the whole matrix header, i.e. antibiotics, substance classes and all spacing
	*/
	_getEffectiveHeaderHeight() {
		// this._spaceBetweenGroups / 2: Just add a small space between header and body
		return this.props.matrix.antibioticLabelRowHeight + this._spaceBetweenGroups / 2 +
			this.props.matrix.maxAmountOfSubstanceClassHierarchies * (this.props.matrix.greatestSubstanceClassLabelHeight || 0);
	}

	/**
	* Returns height of the matrix' body (circles). 
	*/
	_getBodyHeight() {
		return (this.props.matrix.defaultRadius * 2 + this.props.matrix.space) * this.props.matrix.sortedVisibleBacteria.length;
	}

	render() {
		return(
			<svg ref={(el) => this._setSVG(el)} style={{height: this._getHeight()}} className="resistanceMatrix">

				<g style={{transform: this._getAntibioticLabelsTransformation()}} className="resistanceMatrix__antibioticsLabels">
					{this.props.matrix.substanceClasses.map((sc) => 
						<SubstanceClass key={sc.substanceClass.id} substanceClass={sc} matrix={this.props.matrix} bodyHeight={this._getBodyHeight()}/>
					)}
					{this.props.matrix.sortedAntibiotics.map((ab) => 
						<AntibioticLabel key={ab.antibiotic.id} antibiotic={ab} matrix={this.props.matrix}/>
					)}
				</g>

				<g style={{transform: this._getBacteriaLabelsTransformation()}} className="resistanceMatrix__bacteriaLabels">
					{this.props.matrix.sortedBacteria.map((bact) => 
						<BacteriumLabel key={bact.bacterium.id} bacterium={bact} matrix={this.props.matrix}/>
					)}
				</g>

				{ /* Only render when radius is ready and after labels were drawn or we will have multiple re-renders */ }
				{ this.props.matrix.defaultRadius && this.props.matrix.antibioticLabelRowHeight && 
				<g style={{transform: this._getMainMatrixTransformation()}} className="resistanceMatrix__resistances">
					{ /* Resistances */ }
					{this.props.matrix.resistances.map((res) =>
						<Resistance key={res.resistance.antibiotic.id + '/' + res.resistance.bacterium.id} matrix={this.props.matrix} resistance={res}/>
					)}
					{ /* Resistance detail (hover) */ }
					{ this.props.matrix.activeResistance &&
						<ResistanceDetail resistance={this.props.matrix.activeResistance} defaultRadius={ this.props.matrix.defaultRadius }/>
					}
				</g>
				}

			</svg>
		);
	}

}
