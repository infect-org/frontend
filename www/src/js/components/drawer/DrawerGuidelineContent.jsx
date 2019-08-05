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
            <div className={'drawer__inner'}>
                <div className={'drawer__fixed'}>
                    <h1>{diagnosis.name}</h1>
                </div>

                <div className={'drawer__scrollable'}>
                    <div className={'drawer__scrollable-inner'}>

                        <p>{diagnosis.diagnosisClass.name}</p>
                        <p><em>{guideline.name}</em></p>

                        {guideline.markdownDisclaimer &&
                            <div
                                className={'markdown'}
                                dangerouslySetInnerHTML={
                                    this.generateMarkdownFromHtml(guideline.markdownDisclaimer)
                                }
                            ></div>
                        }

                        {diagnosis.therapies.map(therapy => (
                            <div key={therapy.priority.order} className={'diagnosis-text'}>
                                <h3 className={'diagnosis-text__choose-title'}>
                                    <span className={'diagnosis-text__choose-title-number'}>
                                        {therapy.priority.order}
                                    </span>
                                    {therapy.priority.name}
                                </h3>
                                {therapy.recommendedAntibiotics.map(antibiotic => (
                                    <div
                                        key={antibiotic.id}
                                        className={'markdown'}
                                        dangerouslySetInnerHTML={
                                            this.generateMarkdownFromHtml(antibiotic.markdownText)
                                        }
                                    ></div>
                                )) }
                                {therapy.markdownText &&
                                    <div
                                        className={'markdown'}
                                        dangerouslySetInnerHTML={
                                            this.generateMarkdownFromHtml(therapy.markdownText)
                                        }
                                    ></div>
                                }
                            </div>
                        ))}

                        <div
                            className={'markdown'}
                            dangerouslySetInnerHTML={this.generateMarkdownFromHtml(diagnosis.markdownText)}
                        ></div>
                    </div>
                </div>
            </div>
        );
    }
}
