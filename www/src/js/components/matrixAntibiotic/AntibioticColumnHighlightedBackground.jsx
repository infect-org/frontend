import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import getVisibilityClassModifier from '../../helpers/getVisibilityClassModifier.js';

export default @observer class AntibioticColumnHighlightedBackground extends React.Component {

    /**
     * Returns xPosition of the current highlighted background
     * @return {Number}     x position
     */
    @computed get xPosition() {
        const position = this.props.matrix.xPositions.get(this.props.antibiotic);
        /**
         * If antibiotic is not visible, return previous position (to minimize objects that need to
         * be rendered)
         */
        if (!position) return (this.previousXPosition || 0);
        const left = position.left + this.props.matrix.bacteriumLabelColumnWidth +
            this.props.matrix.spaceBetweenGroups;
        this.previousXPosition = left;
        return left;
    }

    /**
     * Returns therapies (from selected guideline/diagnosis) that the current antibiotic is
     * recommended for.
     * @return {[Therapy]}
     */
    @computed get selectedTherapiesForAntibiotic() {
        const diagnosis = this.props.guidelines &&
            this.props.guidelines.selectedGuideline &&
            this.props.guidelines.selectedGuideline.selectedDiagnosis;
        if (!diagnosis) return [];
        return diagnosis.therapies
            .filter(therapy => therapy.containsAntibiotic(this.props.antibiotic.antibiotic));
    }

    /**
     * Returns true if antibiotic is contained in any one therapy that belongs to the currently
     * selected diagnosis.
     * @return {Boolean}    Visiblity of the highlighted background
     */
    @computed get visible() {
        return this.props.antibiotic.visible && this.selectedTherapiesForAntibiotic.length > 0;
    }

    /**
     * If background was invisible and becomes visible, we only want to fade it in after all
     * resistances got their position. Delay is added through a corresponding CSS class.
     * @return {String}  CSS class to delay animation or not
     */
    @computed get transitionClassModifier() {
        // We must update class whenever position changes; if not, it will stay
        // -was-hidden-is-visible after long after the first transformation
        this.xPosition;
        const modifier = getVisibilityClassModifier(
            this.visible,
            (this.wasVisible || false),
        );
        this.wasVisible = this.visible;
        return modifier;

    }

    /**
     * Opacity for therapies with priority order 1 should be more opaque.
     * @return {Number}     Opacity for the highlight depending on matching therapy's priorty
     */
    @computed get opacity() {
        const priorities = this.selectedTherapiesForAntibiotic
            .map(therapy => therapy.priority.order);
        return priorities.includes(1) ? 0.8 : 0.3;
    }

    render() {
        return (
            <g
                className={`resistanceMatrix__antibioticColumnHighlightedBackground ${this.transitionClassModifier}`}
                transform={`translate(${this.xPosition}, 0)`}
                style={{ opacity: this.visible ? 1 : 0 }}
            >
                <rect
                    height={this.props.matrix.visibleBacteriaHeight +
                        this.props.matrix.spaceBetweenGroups}
                    x="0"
                    y="0"
                    width={this.props.matrix.defaultRadius * 2}
                    style={{ opacity: this.opacity }}
                    /* FABIAN to the rescue! */
                    fill="#A7CCEB"
                />
            </g>
        );
    }
}
