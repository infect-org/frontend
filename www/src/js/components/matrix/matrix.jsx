import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import debug from 'debug';
import BacteriumLabel from '../matrixBacterium/bacteriumLabel.jsx';
import Resistance from '../matrixResistance/resistance.jsx';
import ResistanceDetail from '../matrixResistance/resistanceDetail.jsx';
import SubstanceClassLine from '../matrixSubstanceClass/substanceClassLine.jsx';

const log = debug('infect:MatrixComponent');

export default @observer class Matrix extends React.Component {

    @observable svg;

    componentDidMount() {
        this._setupResizeListener();
    }

    /**
    * Returns height of the whole matrix
    */
    @computed get height() {
        if (!this.props.matrix.defaultRadius) return 0;
        // Height: All bact labels + ab label + space between ab label and matrix (matrix.space +
        // matrix.radius), see bacteriumLabel
        return this.bodyHeight;
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
        /* global window */
        window.addEventListener('resize', () => this._setDimensions());
    }

    @computed get mainMatrixTransformation() {
        const left = this.props.matrix.bacteriumLabelColumnWidth +
            this.props.matrix.spaceBetweenGroups;
        return `translate(${left}, 0)`;
    }

    /**
    * Returns height of the matrix' body (circles).
    */
    @computed get bodyHeight() {
        // Always display matrix in full height (also for invisible bacteria) or animations will
        // be cut off at the bottom (height of matrix changes before the bacteria animate)
        return ((this.props.matrix.defaultRadius * 2) + this.props.matrix.space)
            * this.props.matrix.sortedBacteria.length;
    }

    @computed get visibleBacteriaHeight() {
        return ((this.props.matrix.defaultRadius * 2) + this.props.matrix.space) *
            this.props.matrix.sortedVisibleBacteria.length;
    }

    render() {
        return (
            <div>
                {/* <DevTools /> */}
                {/* -with-transitions: only show transitions when a filter changes – before (when
                     setting up the matrix) we don't want imperformant transitions */}
                {/* Use width=100% attribute to prevent tiny matrix if css is rendered after JS is
                     executed. Will be overwritten by CSS */}
                <svg
                    ref={this._setSVG}
                    width="100%"
                    style={{ height: this.height, top: this.props.matrix.headerHeight }}
                    className={`resistanceMatrix__body ${this.props.selectedFilters.filterChanges > 0 ? '-with-transitions' : '-no-transitions'}`}>

                    {/* Lines for substance classes in body */}
                    {this.props.matrix.defaultRadius &&
                        <g transform={this.mainMatrixTransformation}>
                            {this.props.matrix.substanceClasses.map(substanceClass => (
                                <SubstanceClassLine
                                    key={substanceClass.substanceClass.id}
                                    substanceClass={substanceClass}
                                    matrix={this.props.matrix}
                                    bodyHeight={this.visibleBacteriaHeight}
                                />
                            ))}
                        </g>
                    }

                    {/* Bacteria labels */}
                    <g className="resistanceMatrix__bacteriaLabels">
                        {this.props.matrix.sortedBacteria.map(bacterium => (
                            <BacteriumLabel
                                key={bacterium.bacterium.id}
                                bacterium={bacterium}
                                matrix={this.props.matrix}
                                selectedFilters={this.props.selectedFilters}
                            />
                        ))}
                    </g>

                    {/* Resistances */}
                    {/* Only render when radius is ready and after labels were drawn or we will have
                        multiple re-renders */}
                    {this.props.matrix.defaultRadius &&
                        <g
                            transform={this.mainMatrixTransformation}
                            className="resistanceMatrix__resistances"
                        >
                            {/* Resistances */}
                            {this.props.matrix.resistances.map(resistance => (
                                <Resistance
                                    key={`${resistance.resistance.antibiotic.id}/${resistance.resistance.bacterium.id}`}
                                    matrix={this.props.matrix}
                                    resistance={resistance}/>
                            ))}
                            {/* Resistance detail (hover) */}
                            {this.props.matrix.activeResistance &&
                                <ResistanceDetail
                                    resistance={this.props.matrix.activeResistance}
                                    defaultRadius={this.props.matrix.defaultRadius}
                                />
                            }
                        </g>
                    }

                </svg>
            </div>
        );
    }

}
