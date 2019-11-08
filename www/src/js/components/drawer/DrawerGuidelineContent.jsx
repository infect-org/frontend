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
        this.renderer = this.prepareRenderer();
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    /**
     * Use custom renderer for markdown text to improve spacing in text blocks (without affecting
     * e.g. html elements)
     */
    prepareRenderer() {

        const renderer = new marked.Renderer();

        renderer.text = text => text
            // Abbreviations, e.g. x.y. (p.o. becomes p.(hairspace)o.)
            .replace(/(\w\.)(\w\.)/g, '$1&#8202;$2')
            // Number and unit (5g becomes 5(hairspace)g)
            .replace(/(\d+)([a-z]{1,2})(\b)/g, '$1&#8202;$2')
            // Slashes (4g/kg/d becomes 4g(hairspace)/(hairspace)kg(hairspace)/(hairspace)d)
            // Only applies to slashes not followed or preceded by a space
            .replace(/(\S)\/(?!\s)/g, '$1&#8202;/&#8202;');

        // Open all links in a new window (add target="_blank")
        renderer.link = (href, title, text) => {
            const titleString = title ? `title=${title}` : '';
            return `<a href="${href}" target="_blank" ${titleString}>${text}</a>`;
        }

        return renderer;

    }

    /**
     * Rendered markdown contains HTML tags; in order to render them, we must use
     * dangerouslySetInnerHTML, which doesn't pose a threat here as content is never created by
     * unauthorized people.
     */
    generateMarkdownFromHtml(content) {
        // Marked and RegExes throws if content is null or undefined; just return an empty string
        // without invoking Marked.
        return content ?
            { __html: marked(content, { renderer: this.renderer }) } :
            { __html: '' };
    }

    toggleDrawer() {
        this.props.drawerViewModel.isOpen ?
            this.props.drawerViewModel.close() :
            this.props.drawerViewModel.open();
    }

    formatDate(date) {
        const pad = nr => nr < 10 ? `0${nr}` : `${nr}`;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    render() {
        const guideline = this.props.content;
        const diagnosis = guideline.selectedDiagnosis;
        return (
            <div className="drawer__inner">

                <div className="drawer__teaser">
                    <div
                        className="drawer__teaser-flap"
                        onClick={this.toggleDrawer}
                    >
                        {/*<svg aria-hidden="true">
                            <use xlinkHref="#icon_guidelines"></use>
                        </svg>*/}
                        <div className="drawer__teaser-subtitle">Guideline</div>
                        <div className="drawer__teaser-title">{diagnosis.name}</div>
                    </div>
                </div>

                <div className="drawer__fixed">
                    <h1>{diagnosis.name}</h1>
                </div>

                <div className="drawer__scrollable">
                    <div className="drawer__scrollable-inner">

                        <div className="drawer__header">

                            <div className="drawer__header-inner">

                                <p>
                                    {diagnosis.diagnosisClass.name}<br />
                                    <strong><a
                                        href={guideline.link}
                                        target="_blank"
                                        className="drawer__header-inner-link"
                                    >
                                        {guideline.name}
                                    </a></strong>
                                </p>

                                {guideline.markdownDisclaimer &&
                                    <div
                                        className="markdown drawer-disclaimer"
                                    >
                                        <span
                                            dangerouslySetInnerHTML={
                                                this.generateMarkdownFromHtml(`${guideline.markdownDisclaimer}`)
                                            }
                                        ></span>
                                    </div>
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

                                        <p>
                                            Updated on{' '}
                                            {this.formatDate(diagnosis.latestUpdate.date)}{' '}
                                            from{' '}
                                            <a href={diagnosis.latestUpdate.link} target="_blank">
                                                {diagnosis.latestUpdate.name}
                                            </a>
                                        </p>

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
