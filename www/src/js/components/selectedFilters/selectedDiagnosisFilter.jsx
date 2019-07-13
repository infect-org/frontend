import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

/**
 * Represents a single selected diagnosis guideline in filter bar through whichd iagnosis can be
 * removed.
 */
export default @observer class SelectedDiagnosisFilter extends React.Component {

    constructor(...props) {
        super(...props);
        this.removeSelectedDiagnosis = this.removeSelectedDiagnosis.bind(this);
    }

    removeSelectedDiagnosis() {
        this.props.guidelines.selectedGuideline.selectDiagnosis();
    }

    /**
     * Returns currently selected diagnosis
     * @return {Diagnosis}      Selected diagnosis or undefined if none is selected
     */
    @computed get selectedDiagnosis() {
        return this.props.guidelines &&
        this.props.guidelines.selectedGuideline &&
        this.props.guidelines.selectedGuideline.selectedDiagnosis;
    }

    /**
     * Only show selected diagnosis filter if a diagnosis was selected
     * @return {Bool}
     */
    @computed get visible() {
        return !!this.selectedDiagnosis;
    }


    render() {
        if (!this.visible) return null;
        return (
            <div className="group group--black-font">
                <h2>Guideline</h2>
                <ul className="group__list">
                    <li className="group__list-item list-item">
                        <div className="label label--rounded">
                            <p className="label--smaller label--nomargin">
                                Diagnosis
                            </p>
                            <p className="label--bold label--nomargin">
                                {this.selectedDiagnosis.name}
                            </p>
                        </div>
                        <button
                            onClick={this.removeSelectedDiagnosis}
                            className="button button--label"
                        >
                            <span>&times;</span>
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}
