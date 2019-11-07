import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import getVisibilityClassModifier from '../../helpers/getVisibilityClassModifier';



export default @observer class BacteriumLabel extends React.Component {

    constructor() {
        super();
        this._wasVisible = true;
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

    @computed get highlightClass() {
        const { activeResistance } = this.props.matrix;
        if (!activeResistance) return '';
        return this.props.bacterium.bacterium === activeResistance.resistance.bacterium ? 'highlight' : '';
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
                    className={`resistanceMatrix__bacteriumLabelText ${this.highlightClass}`}
                    dominantBaseline="middle"
                    y={this.props.matrix.defaultRadius}
                >
                    {this.props.bacterium.bacterium.shortName ||
                        this.props.bacterium.bacterium.name}
                </text>
            </g>
        );
    }

}
