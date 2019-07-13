import React from 'react';
import { observer } from 'mobx-react';
import debug from 'debug';
import generateFilterList from './generateFilterList';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox.jsx';

const log = debug('infect:GuidelinesFilterList');

@observer
class GuidelinesFilterList extends React.Component {

    constructor(...props) {
        super(...props);
        this.selectDiagnosis = this.selectDiagnosis.bind(this);
    }

    selectDiagnosis(diagnosis) {
        log('Update selected diagnosis to %o', diagnosis);
        this.props.guidelines.selectedGuideline.selectDiagnosis(diagnosis);
    }

    render() {
        // Only display guideline if they were loaded and guideline was selected
        if (!this.props.guidelines || !this.props.guidelines.selectedGuideline) return null;
        return (
            <ul className="group__list group__list--vertical">
                {this.props.guidelines.selectedGuideline.diagnoses.map(diagnosis => (
                    <FilterListCheckbox
                        key={diagnosis.id}
                        inputName='diagnosis'
                        name={diagnosis.name}
                        inputType="radio"
                        checked={
                            diagnosis === this.props.guidelines.selectedGuideline.selectedDiagnosis
                        }
                        onChangeHandler={() => this.selectDiagnosis(diagnosis)}
                    />
                ))}
            </ul>
        );
    }
}

export default generateFilterList(GuidelinesFilterList);

