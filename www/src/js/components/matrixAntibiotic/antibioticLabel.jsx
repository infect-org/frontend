import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import getVisibilityClassModifier from '../../helpers/getVisibilityClassModifier';

export default @observer class AntibioticLabel extends React.Component {

    /**
     * Radius for blue circle that is displayed if label's antibiotic is relevant for selected
     * guideline/diagnosis
     * @private
     */
    guidelineCircleRadius = 10;

    /**
     * Space between multiple (blue) guideline circles or guideline circle and subsequent text
     * @private
     */
    spaceBetweenGuidelineCircles = 4;

    /**
     * To animate label correctly, we must know if its visibility has changed with the latest
     * update.
     * @private
     */
    _wasVisible = true;

    componentDidMount() {
        this._setupResizeListener();
    }

    _setTextElement = (el) => {
        if (!el) return;
        this._textElement = el;
        this._setDimensions();
    }

    /**
    * Set height of view on model; needed as height is variable (because uf the 45° angle)
    * and space available for the matrix is calculated depending on the space that the highest
    * label takes up.
    */
    _setDimensions() {
        if (!this._textElement) return;
        // Assume a transformation of -90%. We only use -75% but having some space's not wrong.
        const width = Math.ceil(this._textElement.getBBox().width);
        this.props.antibiotic.setDimensions(width, width);
    }

    @computed get transformation() {
        const rotation = 'rotate(-75)';
        // Before textElement is ready, hight of antibiotics (and therefore the transformation)
        // cannot be known.
        if (!this.props.matrix.greatestSubstanceClassLabelHeight) {
            return `translate(0, 0) ${rotation}`;
        }
        if (!this.props.antibiotic.visible) {
            return `translate(${this._previousPosition.left || 0}, ${this._previousPosition.top || 0}) ${rotation}`;
        }
        // We must add some of the height (60°/90°) as we rotated the label which positions it more
        // to the left
        const pos = this.props.matrix.xPositions.get(this.props.antibiotic);
        const left = (pos ? pos.left : 0) + (this._textElement.getBBox().height * 1.2);
        const substanceClassModifier = (this.props.matrix.maxAmountOfSubstanceClassHierarchies -
            this.props.antibiotic.antibiotic.getSubstanceClasses().length);
        const top = (this.props.matrix.antibioticLabelRowHeight || 0) +
            (substanceClassModifier * (this.props.matrix.greatestSubstanceClassLabelHeight || 0));
        this._previousPosition = { left, top };
        return `translate(${left}, ${top}) ${rotation}`;
    }

    @computed get classModifier() {
        // We must also be watching transitions: If not, we only watch visible – which stays the
        // same when modifier should change from -was-hidden-is-visible to -was-visible-is-visible
        // and therefore won't call an update.
        this.transformation;
        const modifier = getVisibilityClassModifier(
            this.props.antibiotic.visible,
            this._wasVisible,
        );
        this._wasVisible = this.props.antibiotic.visible;
        return modifier;
    }

    _setupResizeListener() {
        /* global window */
        window.addEventListener('resize', () => this._setDimensions());
    }

    /**
     * If mouse hovers resistance that relates to this label's antibiotic, highlight it.
     * @return {String}         Class name to add to label
     */
    @computed get highlightClass() {
        const { activeResistance } = this.props.matrix;
        if (!activeResistance) return '';
        return this.props.antibiotic.antibiotic === activeResistance.resistance.antibiotic ?
            'highlight' : '';
    }

    /**
     * If this antibiotic is relevant for the selected diagnosis, it should be colored blue. Do
     * this by returning the corresponding class
     * @return {String}         Class name to add to antibiotic text
     */
    @computed get guidelineClass() {
        return this.therapiesForSelectedDiagnosisAndAntibiotic.length > 0 ?
            'containsGuidelineData' : '';
    }

    /**
     * Checks if the current antibiotic is recommended in one or more therapies of the selected
     * diagnosis/guideline.
     * @return {[Number]|undefined}      Array of all the relevant therapies' orders (or [] if not
     *                                   relevant)
     */
    @computed get therapiesForSelectedDiagnosisAndAntibiotic() {

        const diagnosis = this.props.guidelines &&
            this.props.guidelines.selectedGuideline &&
            this.props.guidelines.selectedGuideline.selectedDiagnosis;

        if (!diagnosis) return [];

        return diagnosis.therapies
            .filter(therapy => therapy.containsAntibiotic(this.props.antibiotic.antibiotic))
            .map(therapy => therapy.priority.order);

    }

    /**
     * Returns diameter of guideline circle (2 * radius) plus space
     * @return {Number}
     */
    get totalGuidelineCircleWidth() {
        return (this.guidelineCircleRadius * 2) + this.spaceBetweenGuidelineCircles;
    }

    render() {
        return (
            <g
                transform={this.transformation}
                style={{ visibility: this.props.matrix.defaultRadius ? 'visible' : 'hidden' }}
                className={`resistanceMatrix__antibioticLabel ${this.classModifier}`}
            >
                {/* Add circle with priority number if current antibiotic is relevant for the
                    selected guideline/diagnosis */}
                {this.therapiesForSelectedDiagnosisAndAntibiotic &&
                    this.therapiesForSelectedDiagnosisAndAntibiotic.map((order, index) => (
                        <g key={order}>
                            <circle
                                r={this.guidelineCircleRadius}
                                /**
                                 * Move x coordinate with every circle by (diameter + space) plus
                                 * 10px as basis shift)
                                 */
                                cx={(index * this.totalGuidelineCircleWidth) + 9}
                                cy="-13"
                                className="resistanceMatrix__antibioticLabelGuidelinePriorityCircle"
                            />
                            <text
                                dy="-9"
                                /**
                                 * Move x coordinate with every text/circle by (diameter + space)
                                 * plus 5px as basis shift)
                                 */
                                dx={5 + (this.totalGuidelineCircleWidth * index)}
                                className="resistanceMatrix__antibioticLabelGuidelinePriorityText"
                            >
                                {order}
                            </text>
                        </g>
                    ))
                }
                <text
                    dy="-9"
                    ref={this._setTextElement}
                    /**
                     * If antibiotic is relevant for selected guideline/diagnosis, shift label's x
                     * coordinate by amount of circles that are displayed in front of it
                     * (diameter + space)
                     */
                    dx={
                        this.therapiesForSelectedDiagnosisAndAntibiotic.length *
                        this.totalGuidelineCircleWidth
                    }
                    className={`resistanceMatrix__antibioticLabelText ${this.highlightClass} ${this.guidelineClass}`}
                >
                    {this.props.antibiotic.antibiotic.name}
                </text>
            </g>
        );
    }

}
