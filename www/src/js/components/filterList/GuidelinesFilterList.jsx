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
                    {this.props.guidelines.selectedGuideline.diagnoses
                        .sort((a, b) => (a.name < b.name ? -1 : 1))
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
                    Specific Therapies<br/>(Coming Soon …)
                </h3>
                { /* TODO: This is a quick fix to tease specific therapies on INFECT by anresis.ch. 
                    Remove when specifi therapies are available and make tenant dependent when we
                    create the first tenant. */}
                <ul className="group__list group__list--vertical">
                    <li className="list-item--radio group__list-item">
                        <input type="radio" disabled />
                        <label className="side-label gray">Chlamydia (C. trachomatis) / LGV</label>
                    </li>
                    <li className="list-item--radio group__list-item">
                        <input type="radio" disabled />
                        <label className="side-label gray">Gonorrhoe/ Tripper (N.gonorrhoea)</label>
                    </li>
                    <li className="list-item--radio group__list-item">
                        <input type="radio" disabled />
                        <label className="side-label gray">Syphilis / Lues</label>
                    </li>
                </ul>
            </div>
        );
    }
}
