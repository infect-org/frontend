import React from 'react';
import marked from 'marked';
import { observer } from 'mobx-react';

export default @observer class DrawerGuidelineContent extends React.Component {

    /**
     * Rendered markdown contains HTML tags; in order to render them, we must use
     * dangerouslySetInnerHTML, which doesn't pose a threat here as content is never created by
     * unauthorized people.
     */
    generateMarkdownFromHtml(content) {
        return { __html: marked(content) };
    }

    render() {
        const guideline = this.props.content;
        const diagnosis = guideline.selectedDiagnosis;
        return (
            <div>
                <h1>{diagnosis.name}</h1>
                <p>{diagnosis.diagnosisClass.name}</p>
                <p><em>{guideline.name}</em></p>

                {guideline.markdownDisclaimer &&
                    <p
                        dangerouslySetInnerHTML={
                            this.generateMarkdownFromHtml(guideline.markdownDisclaimer)
                        }
                    ></p>
                }

                {diagnosis.therapies.map(therapy => (
                    <div key={therapy.priority.order}>
                        <h3>{therapy.priority.order} {therapy.priority.name}</h3>
                        {therapy.recommendedAntibiotics.map(antibiotic => (
                            <div key={antibiotic.id}>
                                <div dangerouslySetInnerHTML={
                                    this.generateMarkdownFromHtml(antibiotic.markdownText)
                                }>
                                </div>
                            </div>
                        )) }
                        {therapy.markdownText &&
                            <p
                                dangerouslySetInnerHTML={
                                    this.generateMarkdownFromHtml(therapy.markdownText)
                                }
                            ></p>
                        }
                    </div>
                ))}

                <div
                    dangerouslySetInnerHTML={this.generateMarkdownFromHtml(diagnosis.markdownText)}
                ></div>

            </div>
        );
    }
}
