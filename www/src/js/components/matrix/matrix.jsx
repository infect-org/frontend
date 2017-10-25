import React from 'react';
import BacteriumLabel from '../matrixBacterium/bacteriumLabel';
import Resistance from '../matrixResistance/resistance';
import ResistanceDetail from '../matrixResistance/resistanceDetail';
import SubstanceClassLine from '../matrixSubstanceClass/substanceClassLine';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import debug from 'debug';
const log = debug('infect:MatrixComponent');
//import DevTools from 'mobx-react-devtools';

@observer
export default class Matrix extends React.Component {

	@observable svg;

	constructor() {
		super();
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
		return this._getBodyHeight();
	}

	// Use a bound method for ref: 
	// https://github.com/facebook/react/issues/4533#issuecomment-276783714
	_setSVG = (element) => {
		log('SVG set to %o', element);
		this._svg = element;
		this._setDimensions();
	}

	_setDimensions() {
		if (!this._svg) return;
		const dimensions = this._svg.getBoundingClientRect();
		log('Set dimensions to %o', dimensions);
		this.props.matrix.setDimensions(dimensions);
	}

	_setupResizeListener() {
		window.addEventListener('resize', () => this._setDimensions());
	}

	_getMainMatrixTransformation() {
		const left = this.props.matrix.bacteriumLabelColumnWidth + this.props.matrix.spaceBetweenGroups;
		return `translate(${ left }, 0)`;
	}

	/**
	* Returns height of the matrix' body (circles). 
	*/
	_getBodyHeight() {
		return (this.props.matrix.defaultRadius * 2 + this.props.matrix.space) * this.props.matrix.sortedVisibleBacteria.length;
	}

	render() {
		return(
			<div>
				{ /*<DevTools /> */ }
				<svg ref={ this._setSVG } 
					style={ { height: this._getHeight(), top: this.props.matrix.headerHeight } } 
					className="resistanceMatrix__body">

					{ /* Lines for substance classes in body */ }
					{ this.props.matrix.defaultRadius && 
						<g transform={ this._getMainMatrixTransformation() }>
							{ this.props.matrix.substanceClasses.map((sc) => 
								<SubstanceClassLine key={ sc.substanceClass.id } substanceClass={ sc } 
									matrix={ this.props.matrix } bodyHeight={ this._getBodyHeight() }/>
							) }
						</g>
					}

					{ /* Bacteria labels */ }
					<g className="resistanceMatrix__bacteriaLabels">
						{ this.props.matrix.sortedBacteria.map((bact) => 
							// Don't render bacteria that have no resistanceData
							//bact.bacterium.hasDataForResistances &&
								<BacteriumLabel key={ bact.bacterium.id } bacterium={ bact } matrix={ this.props.matrix }/>
						) }
					</g>

					{ /* Resistances */ }
					{ /* Only render when radius is ready and after labels were drawn or we will have multiple re-renders */ }
					{ this.props.matrix.defaultRadius && 
						<g transform={ this._getMainMatrixTransformation() } className="resistanceMatrix__resistances">
							{ /* Resistances */ }
							{ this.props.matrix.resistances.map((res) =>
								<Resistance key={res.resistance.antibiotic.id + '/' + res.resistance.bacterium.id} 
									matrix={this.props.matrix} resistance={res}/>
							) }
							{ /* Resistance detail (hover) */ }
							{ this.props.matrix.activeResistance &&
								<ResistanceDetail resistance={ this.props.matrix.activeResistance } 
									defaultRadius={ this.props.matrix.defaultRadius }/>
							}
						</g>
					}

				</svg>
			</div>
		);
	}

}
