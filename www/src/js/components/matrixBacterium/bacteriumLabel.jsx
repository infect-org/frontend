import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import getVisibilityClassModifier from '../../helpers/getVisibilityClassModifier';



export default @observer class BacteriumLabel extends React.Component {

    constructor() {
        super();
        this._wasVisible = true;
        this.isWindowWide = window.innerWidth > 1200;
    }

    componentDidMount() {
        this._setupResizeWatcher();
    }

    @computed get visible() {
        // Don't display bacterium when we are still measuring its width
        return this.props.matrix.defaultRadius !== undefined && this.props.bacterium.visible;
    }

    @computed get classModifier() {
        // We must also be watching transitions: If not, we only watch visible – which stays the
        // same when modifier should change from -was-hidden-is-visible to -was-visible-is-visible
        // and therefore won't call an update.
        this.transformation;
        const modifier = getVisibilityClassModifier(this.visible, this._wasVisible);
        this._wasVisible = this.visible;
        return modifier;
    }

    _getPreviousPosition() {
        return `translate(${(this._previousPosition && this._previousPosition.left) || 0}, ${(this._previousPosition && this._previousPosition.top) || 0})`;
    }

    @computed get transformation() {
        // We can only position elements correctly when we know defaultRadius. Until then,
        // hide the labels
        if (!this.props.matrix.defaultRadius) return this._getPreviousPosition();
        if (!this.visible) return this._getPreviousPosition();
        // Top: top of bacterium plus radius (baseline corresponds to the center of the circles)
        const pos = this.props.matrix.yPositions.get(this.props.bacterium);
        // If pos is not available (because bacterium is hidden) return previous top – we don't
        // want to move labels if not necessary (as they're invisible; performance)
        const top = pos && pos.top !== undefined ? pos.top : (this._previousTop || 0);
        this._previousPosition = { left: 0, top };
        return `translate(0, ${top})`;
    }

    _setTextElement(element) {
        if (!element) return;
        this._textElement = element;
        this._setWidth();
    }

    _setWidth() {
        this.props.bacterium.setWidth(this._textElement.getBBox().width);
    }

    _setupResizeWatcher() {
        /* global window */
        window.addEventListener('resize', () => this._setWidth());
    }

    /**
     * Underline bacterium when a resistance that relates to the bacterium has been hovered
     * @return {string}         HTML class name to add
     */
    @computed get highlightClass() {
        const { activeResistance } = this.props.matrix;
        if (!activeResistance) return '';
        return this.props.bacterium.bacterium === activeResistance.resistance.bacterium ? 'highlight' : '';
    }

    /**
     * If current bacterium causes the selected diagnosis, use guideline color (blue) as text color
     * @return {boolean}        True if bacterium can cause selected diagnosis
     */
    @computed get causesSelectedDiagnosis() {
        const diagnosis = this.props.guidelines &&
            this.props.guidelines.selectedGuideline &&
            this.props.guidelines.selectedGuideline.selectedDiagnosis;
        return diagnosis && diagnosis.inducingBacteria.includes(this.props.bacterium.bacterium);
    }

    /**
     * When there is no resistance data for the current bacterium, grey it out.
     * @return {string}         HTML class name to add
     */
    @computed get deactivatedClass() {
        return this.props.bacterium.hasResistanceData ? '' : '-deactivated';
    }

    render() {
        return (
            <g
                transform={this.transformation}
                className={`resistanceMatrix__bacteriumLabel ${this.classModifier}`}
            >
                {/* rect is only used to give the g a height so that text can be aligned middle
                     We have to place label to the right (x) in order for text-anchor to work. */}
                <text
                    ref={element => this._setTextElement(element)}
                    x={this.props.matrix.bacteriumLabelColumnWidth}
                    className={`resistanceMatrix__bacteriumLabelText ${this.highlightClass} ${this.deactivatedClass} ${this.causesSelectedDiagnosis && '-causes-diagnosis'}`}
                    dominantBaseline="middle"
                    y={this.props.matrix.defaultRadius}
                >
                    {this.isWindowWide && this.props.bacterium.bacterium.name}
                    {!this.isWindowWide &&
                        <tspan>
                            {this.props.bacterium.bacterium.shortName}
                            <title>{this.props.bacterium.bacterium.name}</title>
                        </tspan>
                    }


                </text>
            </g>
        );
    }

}
