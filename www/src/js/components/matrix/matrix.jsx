import React from 'react';
import AntibioticLabel from '../matrix-antibiotic/antibioticLabel';
import BacteriumLabel from '../matrix-bacterium/bacteriumLabel';
import Resistance from '../matrix-resistance/resistance';
import {observer} from 'mobx-react';
//import DevTools from 'mobx-react-devtools';

@observer
export default class Matrix extends React.Component {

	componentDidMount() {
		this._setupResizeListener();
	}

	_getHeight() {
		if (!this.props.matrix.defaultRadius) return 1;
		// Height: All bact labels + ab label + space between ab label and matrix (matrix.space + matrix.radius), 
		// see bacteriumLabel
		return (this.props.matrix.defaultRadius * 2 + this.props.matrix.space) * this.props.matrix.sortedBacteria.length +
			this.props.matrix.antibioticLabelRowHeight + this.props.matrix.defaultRadius + this.props.matrix.space;
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
		return `translate(${ this.props.matrix.space + this.props.matrix.bacteriumLabelColumnWidth }px, 0)`;
	}

	_getBacteriaLabelsTransformation() {
		const top = this.props.matrix.antibioticLabelRowHeight + this.props.matrix.defaultRadius +
			this.props.matrix.space;
		return `translate(0, ${ top }px)`;
	}

	_getMainMatrixTransformation() {
		const left = this.props.matrix.space + this.props.matrix.bacteriumLabelColumnWidth;
		const top = this.props.matrix.antibioticLabelRowHeight + this.props.matrix.defaultRadius +
			this.props.matrix.space;
		return `translate(${ left }px, ${ top }px)`;

	}

	render() {
		return(
			<svg ref={(el) => this._setSVG(el)} style={{height: this._getHeight()}} className="resistanceMatrix">

				<g style={{transform: this._getAntibioticLabelsTransformation()}} className="resistanceMatrix__antibioticsLabels">
					{this.props.matrix.sortedAntibiotics.map((ab) => 
						<AntibioticLabel key={ab.antibiotic.id} antibiotic={ab} matrix={this.props.matrix}/>
					)}
				</g>

				<g style={{transform: this._getBacteriaLabelsTransformation()}} className="resistanceMatrix__bacteriaLabels">
					{this.props.matrix.sortedBacteria.map((bact) => 
						<BacteriumLabel key={bact.bacterium.id} bacterium={bact} matrix={this.props.matrix}/>
					)}
				</g>

				<g style={{transform: this._getMainMatrixTransformation()}} className="resistanceMatrix__resistances">
					{this.props.matrix.defaultRadius && this.props.matrix.resistances.map((res) =>
						<Resistance key={res.resistance.antibiotic.id + '/' + res.resistance.bacterium.id} matrix={this.props.matrix} resistance={res}/>
					)}
				</g>

			</svg>
		);
	}

}
