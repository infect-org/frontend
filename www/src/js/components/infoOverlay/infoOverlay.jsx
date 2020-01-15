import React from 'react';
import { observer } from 'mobx-react';
import { reaction, observable, action } from 'mobx';
import marked from 'marked';
import { severityLevels } from '@infect/frontend-logic';
import GuidedTourButton from '../guidedTour/guidedTourButton.jsx';
import InfoOverlayButton from './infoOverlayButton.jsx';

// import debug from 'debug';
// const log = debug('infect:InfoOverlay');

export default @observer class InfoOverlay extends React.Component {

    @observable content = { __html: '' };

    constructor(...props) {
        super(...props);

        this.renderer = this.prepareRenderer();

        marked.setOptions({
            gfm: true,
            smartypants: true,
            breaks: true,
        });
    }

    /**
     * Tour button needs to open guided tour. Other links should open in a new window. This is not
     * a native function of Markdown, we therefore have to extend/hijack it
     */
    prepareRenderer() {

        const renderer = new marked.Renderer();

        renderer.link = (href, title, text) => {
            const titleString = title ? `title=${title}` : '';
            if (href === '#tourGuideButton') {
                // TourGuideButton: Dispatch startGuidedTour event, is listened to in GuidedTour
                // model. Use # link to remove #information from URL.
                return `<a href="#" data-guided-tour-button onClick="window.dispatchEvent(new Event('startGuidedTour'));" ${titleString}>${text}</a>`;
            } else {
                // Open all links in a new window (add target="_blank")
                return `<a href="${href}" target="_blank" ${titleString}>${text}</a>`;
            }
        };

        return renderer;

    }

    /**
     * Takes path to info overlay content from tenantConfig, fetches content and renders
     * corresponding markdown
     */
    componentDidMount() {

        /* global window */
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
        this.handleHashChange();

        this.awaitTenantConfigAndFetchContent();
    }

    awaitTenantConfigAndFetchContent() {
        reaction(
            () => this.props.tenantConfig.config &&
                this.props.tenantConfig.config.get('frontend'),
            (frontendConfig, disposer) => {
                if (
                    !frontendConfig.userInterface ||
                    !frontendConfig.userInterface.aboutDocumentUrl
                ) {
                    this.props.notifications.handle({
                        message: `Property aboutDocumentUrl on tenantConfig.frontendConfig is missing; frontendConfig is ${JSON.stringify(frontendConfig)} instead.`,
                        severity: severityLevels.warning,
                    });
                    return;
                }
                this.fetchContent(frontendConfig.userInterface.aboutDocumentUrl);
                // Tenant config should not change once it has been fetched; dispose current
                // reaction
                disposer.dispose();
            },
        );
    }

    async fetchContent(url) {
        /* global fetch */
        const rawContent = await fetch(url);
        const textContent = await rawContent.text();
        const htmlContent = marked(textContent, { renderer: this.renderer });
        this.updateContent(htmlContent);
    }

    @action updateContent(htmlContent) {
        this.content = { __html: htmlContent };
    }

    handleHashChange() {
        if (window.location.hash === '#information') {
            this.props.infoOverlay.show();
        } else {
            this.props.infoOverlay.hide();
        }
    }

    render() {
        return (
            <div className={ `overlay ${this.props.infoOverlay.visible ? 'overlay--open' : ''}` }>

                <InfoOverlayButton infoOverlay={this.props.infoOverlay} />
                <div className="overlay__container">
                    <div className="overlay-markdown" dangerouslySetInnerHTML={this.content}></div>
                </div>

            </div>
        );
    }

}
