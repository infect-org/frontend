import React from 'react';
import marked from 'marked';
import { observer } from 'mobx-react';

export default @observer class DrawerGuidelineContent extends React.Component {

    constructor(...props) {
        super(...props);
        marked.setOptions({
            gfm: true,
            smartypants: true,
            breaks: true,
        });
    }

    /**
     * Rendered markdown contains HTML tags; in order to render them, we must use
     * dangerouslySetInnerHTML, which doesn't pose a threat here as content is never created by
     * unauthorized people.
     */
    generateHTMLFromMarkdown(content) {
        // Marked throws if content is null or undefined; just return an empty string without
        // invoking Marked.
        return { __html: content ? marked(content) : '' };
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
                                    this.generateHTMLFromMarkdown(guideline.markdownDisclaimer)
                                }
                            ></div>
                        }

                        {diagnosis.therapies.map(therapy => (
                            <div key={therapy.id.toString()} className={'diagnosis-text'}>
                                <h3 className={'diagnosis-text__choose-title'}>
                                    <span className={'diagnosis-text__choose-title-number'}>
                                        {therapy.priority.order}
                                    </span>
                                    {therapy.priority.name}
                                </h3>
                                {therapy.recommendedAntibiotics.map(antibiotic => (
                                    <div
                                        key={antibiotic.antibiotic.id.toString()}
                                        className={'markdown'}
                                        dangerouslySetInnerHTML={
                                            this.generateHTMLFromMarkdown(antibiotic.markdownText)
                                        }
                                    ></div>
                                )) }
                                {therapy.markdownText &&
                                    <div
                                        className={'markdown'}
                                        dangerouslySetInnerHTML={
                                            this.generateHTMLFromMarkdown(therapy.markdownText)
                                        }
                                    ></div>
                                }
                            </div>
                        ))}

                        <div
                            className={'markdown'}
                            dangerouslySetInnerHTML={
                                this.generateHTMLFromMarkdown(diagnosis.markdownText)
                            }
                        ></div>

                        {guideline.contactEmail &&
                            <div>
                                { /* FABIAN:START */ }
                                <a href={`mailto:${guideline.contactEmail}`}>
                                    Feedback
                                </a>
                                { /* FABIAN:END */ }
                            </div>
                        }

                        {diagnosis.link &&
                            <div>
                                { /* FABIAN:START */ }
                                <a href={diagnosis.link} target="_blank">
                                    {guideline.name}
                                </a>
                                { /* FABIAN:END */ }
                            </div>
                        }

                        {diagnosis.latestUpdate &&
                            <div>
                                { /* FABIAN:START */ }
                                Source:
                                <a href={diagnosis.latestUpdate.link} target="_blank">
                                    {diagnosis.latestUpdate.name}
                                </a>
                                Updated: {diagnosis.latestUpdate.date.toLocaleDateString()}
                                { /* FABIAN:END */ }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
