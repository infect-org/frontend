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
    generateMarkdownFromHtml(content) {
        // Marked and RegExes throws if content is null or undefined; just return an empty string
        // without invoking Marked.
        if (!content) {
            return { __html: '' };
        }
        // Optimize spaces
        const optimizedContent = content
            // Abbreviations, e.g. x.y. (p.o. becomes p.(hairspace)o.)
            .replace(/(\w\.)(\w\.)/g, '$1&#8202;$2')
            // Number and unit (5g becomes 5(hairspace)g)
            .replace(/(\d+)([a-z]{1,2})(\b)/g, '$1&#8202;$2')
            // Slashes (4g/kg/d becomes 4g(hairspace)/(hairspace)kg(hairspace)/(hairspace)d)
            // Only applies to slashes not followed or preceded by a space
            .replace(/(\S)\/(?!\s)/g, '$1&#8202;/&#8202;');
        return { __html: marked(optimizedContent) };
    }

    render() {
        const guideline = this.props.content;
        const diagnosis = guideline.selectedDiagnosis;
        return (
            <div className="drawer__inner">
                <div className="drawer__fixed">
                    <h1>{diagnosis.name}</h1>
                </div>

                <div className="drawer__scrollable">
                    <div className="drawer__scrollable-inner">

                        <div className="drawer__header">

                            <div className="drawer__header-inner">

                                <p>{diagnosis.diagnosisClass.name}<br />
                                <strong>{guideline.name}</strong></p>

                                {guideline.markdownDisclaimer &&
                                    <div
                                        className="markdown drawer-disclaimer"
                                        dangerouslySetInnerHTML={
                                            this.generateMarkdownFromHtml(guideline.markdownDisclaimer)
                                        }
                                    ></div>
                                }

                            </div>

                        </div>

                        <div className="drawer__therapies">

                            <div className="drawer__therapies-inner">

                                {diagnosis.therapies.map(therapy => (
                                    <div key={therapy.id.toString()} className="diagnosis-text">
                                        <h2 className="diagnosis-text__choose-title">
                                            <span className="diagnosis-text__choose-title-number">
                                                {therapy.priority.order}
                                            </span>
                                            {therapy.priority.name}
                                        </h2>
                                        {therapy.recommendedAntibiotics.map(antibiotic => (
                                            <div
                                                key={antibiotic.antibiotic.id.toString()}
                                                className="markdown"
                                                dangerouslySetInnerHTML={
                                                    this.generateMarkdownFromHtml(antibiotic.markdownText)
                                                }
                                            ></div>
                                        )) }
                                        {therapy.markdownText &&
                                            <div
                                                className="markdown"
                                                dangerouslySetInnerHTML={
                                                    this.generateMarkdownFromHtml(therapy.markdownText)
                                                }
                                            ></div>
                                        }
                                    </div>
                                ))}

                            </div>

                        </div>

                        { diagnosis.markdownText &&
                            <div className="diagnosis-general-considerations">

                                <div className="diagnosis-general-considerations__inner">

                                    <h2>General Considerations</h2>

                                    <div
                                        className="markdown"
                                        dangerouslySetInnerHTML={
                                            this.generateMarkdownFromHtml(diagnosis.markdownText)
                                        }
                                    ></div>

                                </div>
                            </div>
                        }

                        <div className="diagnosis-additional-informations">

                            <div className="diagnosis-additional-informations__guideline-link">

                                {diagnosis.link &&
                                    <div>
                                        <a href={diagnosis.link} target="_blank">
                                            {guideline.name}
                                        </a>
                                    </div>
                                }

                            </div>

                            <div className="diagnosis-additional-informations__contact">

                                {guideline.contactEmail &&
                                <div>
                                    <a href={`mailto:${guideline.contactEmail}`}>
                                        Feedback
                                    </a>
                                </div>
                                }

                            </div>

                            <div className="diagnosis-additional-informations__latest-version">

                                {diagnosis.latestUpdate &&
                                    <div>

                                        <p>Source: <a href={diagnosis.latestUpdate.link} target="_blank">
                                            {diagnosis.latestUpdate.name}
                                        </a><br />Updated: {diagnosis.latestUpdate.date.toLocaleDateString()}</p>

                                    </div>
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
