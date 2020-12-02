import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import debug from 'debug';
import BacteriumLabel from '../matrixBacterium/bacteriumLabel.jsx';
import BacteriumRowHighlightedBackground from '../matrixBacterium/BacteriumRowHighlightedBackground.jsx';
import AntibioticColumnHighlightedBackground from '../matrixAntibiotic/AntibioticColumnHighlightedBackground.jsx';
import Resistance from '../matrixResistance/resistance.jsx';
import ResistanceDetail from '../matrixResistance/resistanceDetail.jsx';
import SubstanceClassLine from '../matrixSubstanceClass/substanceClassLine.jsx';
import SubstanceClass from '../matrixSubstanceClass/substanceClass';
import AntibioticLabel from '../matrixAntibiotic/antibioticLabel';

const log = debug('infect:MatrixComponent');

export default @observer class Matrix extends React.Component {

    @observable svg;

    componentDidMount() {
        this._setupResizeListener();
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

    @computed get sortedSubstanceClasses() {
        // We have to use a function that depends on non-changing properties *or* 
		// DOM will be updated (which we don't want or need) and wich destroys our nice
		// animations
		return this.props.matrix.substanceClasses.slice(0).sort((a, b) => {
            return a.substanceClass.order > b.substanceClass.order ? -1 : 1;
		});
	}
    
    @computed get leftColumnWidth() {
        return this.props.matrix.bacteriumLabelColumnWidth +
            this.props.matrix.spaceBetweenGroups;
    }

    @computed get topRowHeight() {
		return this.props.matrix.headerHeight;
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
                    style={{
                        // Add 30 for some space at the bottom (needed when ) bottom-most row
                        // is hovered
                        height: this.props.matrix.visibleBacteriaHeight +
                            this.topRowHeight + this.props.matrix.spaceBetweenGroups
                            + 30,
                        top: this.props.matrix.spaceBetweenGroups,
                    }}
                    className={`resistanceMatrix__body ${this.props.selectedFilters.filterChanges > 0 ? '-with-transitions' : '-no-transitions'}`}>


                    { /* White background behind header (to hide things when content gets behind
                         header if user scrolls) */ }
                    <rect x="0" y="0" height="100%" width="100%" fill="rgb(255, 255, 255)"></rect>

                    { /* Render ab labels early to measure them which is needed to calculate defaultRadius */ }
                    { this.props.matrix.bacteriumLabelColumnWidth !== undefined && 
                        <g>
                            <g
                                className="resistanceMatrix__antibioticsLabels"
                                transform={`translate(${this.leftColumnWidth}, 0)`}
                            >
                                { /* Antibiotic labels */ }
                                {this.props.matrix.sortedAntibiotics.map(antibiotic => 
                                    <AntibioticLabel
                                        key={antibiotic.antibiotic.id}
                                        antibiotic={antibiotic}
                                        matrix={this.props.matrix}
                                        guidelines={this.props.guidelines}
                                    />
                                )}
                            </g>

                            { /* Only display substance classes when defaultRadius is known and position can be calculated 
                                to prevent unnecessary updates */}
                            { this.props.matrix.defaultRadius !== undefined &&
                                <g transform={`translate(${this.leftColumnWidth}, 0)`}>
                                    { /* Substance class labels */ }
                                    { /* - Placed below antibiotics as z-index must be higher (if user hovers a shortened label)
                                        - Sorted by xPosition (reverse): If user hovers a substanceClass left of the next, it must lie
                                        above the right-next substance class */ }
                                    <g className="resistanceMatrix__substanceClassLabes">
                                        {this.sortedSubstanceClasses.map((sc) => 
                                            <SubstanceClass
                                                key={sc.substanceClass.id}
                                                substanceClass={sc}
                                                matrix={this.props.matrix}
                                                className="resistanceMatrix__substanceClassLabel"
                                                filters={this.props.filters}
                                                selectedFilters={this.props.selectedFilters}
                                            />
                                        )}
                                    </g>

                                </g>
                            }
                        </g>
                    }


                    {/* Antibiotics: Highlighted background for guidelines */}
                    {/* Only display when matrix has been completely measured */}
                    {this.props.matrix.defaultRadius &&
                        <g transform={`translate(0, ${this.topRowHeight})`}>
                            {this.props.matrix.sortedAntibiotics.map(antibiotic => (
                                <AntibioticColumnHighlightedBackground
                                    key={antibiotic.antibiotic.id}
                                    antibiotic={antibiotic}
                                    matrix={this.props.matrix}
                                    guidelines={this.props.guidelines}
                                />
                            ))}
                        </g>
                    }

                    {/* Lines for substance classes in body */}
                    {this.props.matrix.defaultRadius &&
                        <g transform={`translate(${this.leftColumnWidth}, ${this.topRowHeight})`}>
                            {this.props.matrix.substanceClasses.map(substanceClass => (
                                // SubstanceClassLine always has the height of an unfiltered matrix.
                                // It will be cropped when height of the whole matrix changes.
                                <SubstanceClassLine
                                    key={substanceClass.substanceClass.id}
                                    substanceClass={substanceClass}
                                    height={
                                        (((this.props.matrix.defaultRadius * 2) +
                                        this.props.matrix.space) *
                                        this.props.matrix.sortedBacteria.length) +
                                        this.props.matrix.spaceBetweenGroups
                                    }
                                />
                            ))}
                        </g>
                    }

                    {/* Bacteria: Highlighted background for guidelines */}
                    {/* Only display when matrix has been completely measured */}
                    {this.props.matrix.defaultRadius &&
                        <g transform={`translate(0, ${this.topRowHeight})`}>
                            {this.props.matrix.sortedBacteria.map(bacterium => (
                                <BacteriumRowHighlightedBackground
                                    key={bacterium.bacterium.id}
                                    bacterium={bacterium}
                                    matrix={this.props.matrix}
                                    guidelines={this.props.guidelines}
                                />
                            ))}
                        </g>
                    }

                    {/* Bacteria labels */}
                    {/* Must be rendered before defaultRadius is known as bactera width is needed
                        to calculate defaultRadius */ }
                    <g
                        className="resistanceMatrix__bacteriaLabels"
                        transform={`translate(0, ${this.topRowHeight})`}
                    >
                        {this.props.matrix.sortedBacteria.map(bacterium => (
                            <BacteriumLabel
                                key={bacterium.bacterium.id}
                                bacterium={bacterium}
                                matrix={this.props.matrix}
                                selectedFilters={this.props.selectedFilters}
                                guidelines={this.props.guidelines}
                            />
                        ))}
                    </g>

                    {/* Resistances */}
                    {/* Only render when radius is ready and after labels were drawn or we will have
                        multiple re-renders */}
                    {this.props.matrix.defaultRadius &&
                        <g
                            transform={`translate(${this.leftColumnWidth}, ${this.topRowHeight})`}
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
