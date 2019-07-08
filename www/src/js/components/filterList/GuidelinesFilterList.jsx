import React from 'react';
import { observer } from 'mobx-react';
import generateFilterList from './generateFilterList';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox.jsx';

@observer
class GuidelinesFilterList extends React.Component {
    render() {
        return (
            <ul className="group__list group__list--vertical">
                {
                    // Only map through diagnoses after selectedGuideline has been set
                    this.props.guidelines.selectedGuideline &&
                    this.props.guidelines.selectedGuideline.diagnoses.map(diagnosis => (
                        <FilterListCheckbox
                            key={diagnosis.id}
                            inputName='diagnosis'
                            name={diagnosis.name}
                            inputType="radio"
                        />
                    ))
                }
            </ul>
        );
    }
}

export default generateFilterList(GuidelinesFilterList);

