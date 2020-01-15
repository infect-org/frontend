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
        marked.setOptions({
            gfm: true,
            smartypants: true,
            breaks: true,
        });
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
        const htmlContent = marked(textContent);
        this.updateContent(htmlContent);
    }

    @action updateContent(htmlContent) {
        console.log(htmlContent);
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
