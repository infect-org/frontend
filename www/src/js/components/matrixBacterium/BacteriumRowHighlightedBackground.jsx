import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import getVisibilityClassModifier from '../../helpers/getVisibilityClassModifier.js';

export default @observer class BacteriumRowHighlightedBackground extends React.Component {

    /**
     * Returns the y position of the current bacterium
     * @return {Number}
     */
    @computed get yPosition() {
        const position = this.props.matrix.yPositions.get(this.props.bacterium);
        /**
         * If bacterium is not visible, return previous position (to minimize objects that need to
         * be rendered)
         */
        if (!position) return (this.previousYPosition || 0);
        // Remove 1/2 space from top so that backgrounds of neighbouring bacteria touch each other
        const topPosition = position.top - (this.props.matrix.space / 2);
        this.previousYPosition = topPosition;
        return topPosition;
    }

    /**
     * Returns the width of the whole matrix (visible antibiotics only)
     * return {Number}
     */
    @computed get width() {
        return this.props.matrix.bacteriumLabelColumnWidth +
            this.props.matrix.spaceBetweenGroups +
            this.props.matrix.visibleAntibioticsWidth;
    }

    /**
     * If background was invisible and becomes visible, we only want to fade it in after all
     * resistances got their position. Delay is added through a corresponding CSS class.
     * @return {String}  CSS class to delay animation or not
     */
    @computed get transitionClassModifier() {
        // We must update class whenever position changes; if not, it will stay
        // -was-hidden-is-visible after long after the first transformation
        this.yPosition;
        const modifier = getVisibilityClassModifier(
            this.visible,
            (this.wasVisible || false),
        );
        this.wasVisible = this.visible;
        return modifier;
    }

    /**
     * Only display highlighted background if a guideline and diagnosis were selected, if the
     * bacterium is visible (filters match bacterium) and if the current bacterium induces the
     * diagnosis.
     * @return {Boolean}
     */
    @computed get visible() {
        if (!this.props.bacterium.visible) return false;
        const diagnosis = this.props.guidelines &&
            this.props.guidelines.selectedGuideline &&
            this.props.guidelines.selectedGuideline.selectedDiagnosis;
        if (!diagnosis) return false;
        return diagnosis.inducingBacteria.includes(this.props.bacterium.bacterium);
    }

    /**
     * Returns the background's opacity (0 if this.visible is false)
     * @return {Number}
     */
    @computed get opacity() {
        return this.visible ? 1 : 0;
    }

    /**
     * Returns height of a bacterium row, if available; else 0
     * @return {Number}
     */
    @computed get height() {
        return (this.props.matrix.defaultRadius * 2) + this.props.matrix.space;
    }

    render() {
        return (
            <g
                transform={`translate(0, ${this.yPosition})`}
                style={{ opacity: this.opacity }}
                className={`resistanceMatrix__bacteriumRowHighlightedBackground ${this.transitionClassModifier}`}
            >
                {/* FABIAN: Add correct styles (BELOW AND ABOVE)! */}
                <rect
                    height={this.height}
                    x="0"
                    y="0"
                    width={this.width}
                    style={{ opacity: 0.3 }}
                    fill="#A7CCEB"
                />
            </g>
        );
    }
}
