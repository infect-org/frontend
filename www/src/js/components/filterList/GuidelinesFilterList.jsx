import React from 'react';
import { observer } from 'mobx-react';
import debug from 'debug';
import generateFilterList from './generateFilterList';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox.jsx';

const log = debug('infect:GuidelinesFilterList');

export default @observer class GuidelinesFilterList extends React.Component {

    selectDiagnosis = this.selectDiagnosis.bind(this);

    selectDiagnosis(diagnosis) {
        log('Update selected diagnosis to %o', diagnosis);
        const { selectedGuideline } = this.props.guidelines;
        // Even though diagnosis is represented by a radio button, let users de-select diagnosis
        // from list (through click on the radio button) – the official way of removing diagnoses
        // may not be very intuitive to everybody.
        if (selectedGuideline.selectedDiagnosis === diagnosis) {
            selectedGuideline.selectDiagnosis();
        } else {
            selectedGuideline.selectDiagnosis(diagnosis);
        }
    }

    render() {
        // Only display guideline if they were loaded and guideline was selected
        if (!this.props.guidelines || !this.props.guidelines.selectedGuideline) return null;
        return (
            <div
                className={`group group--padding group--${this.props.identifier}`}
                id={`js-filter-list-${this.props.identifier}`}
            >
                <h1>{this.props.guidelines.selectedGuideline.name}</h1>
                <h3 className="black margin-top">
                    Empirical Therapies
                </h3>
                <ul className="group__list group__list--vertical">
                    { /* Quick-Fix: List all therapies that belong to the diagnosisClass 'Specific
                         Therapies' under their own chapter. TODO: Remove when specific diagnosis
                         module is available */ }
                    {this.props.guidelines.selectedGuideline.diagnoses
                        .sort((a, b) => (a.name < b.name ? -1 : 1))
                        .filter(diagnosis => diagnosis.diagnosisClass.name !== 'Specific Therapies')
                        .map(diagnosis => (
                            <FilterListCheckbox
                                key={diagnosis.id}
                                inputName="diagnosis"
                                name={diagnosis.name}
                                inputType="radio"
                                checked={
                                    diagnosis ===
                                        this.props.guidelines.selectedGuideline.selectedDiagnosis
                                }
                                onChangeHandler={() => this.selectDiagnosis(diagnosis)}
                            />
                        ))
                    }
                </ul>
                <h3 className="black margin-top">
                    Specific Therapies
                </h3>
                <ul className="group__list group__list--vertical">
                    { /* Quick-Fix: List all therapies that belong to the diagnosisClass 'Specific
                         Therapies' under their own chapter. TODO: Remove when specific diagnosis
                         module is available */ }
                    {this.props.guidelines.selectedGuideline.diagnoses
                        .sort((a, b) => (a.name < b.name ? -1 : 1))
                        .filter(diagnosis => diagnosis.diagnosisClass.name === 'Specific Therapies')
                        .map(diagnosis => (
                            <FilterListCheckbox
                                key={diagnosis.id}
                                inputName="diagnosis"
                                name={diagnosis.name}
                                inputType="radio"
                                checked={
                                    diagnosis ===
                                        this.props.guidelines.selectedGuideline.selectedDiagnosis
                                }
                                onChangeHandler={() => this.selectDiagnosis(diagnosis)}
                            />
                        ))
                    }
                </ul>
            </div>
        );
    }
}
