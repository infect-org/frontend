import React from 'react';
import marked from 'marked';
import { observer } from 'mobx-react';

export default @observer class DrawerGuidelineContent extends React.Component {

    /**
     * Rendered markdown contains HTML tags; in order to render them, we must use
     * dangerouslySetInnerHTML, which doesn't pose a threat here as content is never created by
     * unauthorized people.
     */
    getAntibioticTherapyMarkup(antibioticTherapy) {
        return { __html: marked(antibioticTherapy.markdownText) };
    }

    /**
     * See this.getAntibioticTherapyMarkup()
     */
    getDiagnosisMarkup(diagnosis) {
        return { __html: marked(diagnosis.markdownText) };
    }

    render() {
        const guideline = this.props.content;
        const diagnosis = guideline.selectedDiagnosis;
        return (
            <div>
                <h1>{diagnosis.name}</h1>
                <p>{diagnosis.diagnosisClass.name}</p>
                <p><em>{guideline.name}</em></p>

                <p>Alle Guidelines und Dosierung sind kritisch zu hinterfragen und in eigener
                Verantwortung anzuwenden. Dies setzt immer eine geeignete medizinische Ausbildung
                voraus. Disclaimer
                </p>

                {diagnosis.therapies.map(therapy => (
                    <div key={therapy.priority.order}>
                        <h3>{therapy.priority.order} {therapy.priority.name}</h3>
                        {therapy.recommendedAntibiotics.map(antibiotic => (
                            <div key={antibiotic.antibiotic.id}>
                                <div dangerouslySetInnerHTML={
                                    this.getAntibioticTherapyMarkup(antibiotic)
                                }>
                                </div>
                            </div>
                        )) }
                    </div>
                ))}

                <div dangerouslySetInnerHTML={this.getDiagnosisMarkup(diagnosis)}></div>

            </div>
        );
    }
}
