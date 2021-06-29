import React from 'react';
import { observer } from 'mobx-react';
import { reaction, observable, action } from 'mobx';
import { severityLevels } from '@infect/frontend-logic';
import GuidedTourButton from '../guidedTour/guidedTourButton.jsx';
import InfoOverlayButton from './infoOverlayButton.jsx';
import setupMarked from './setupMarked';

// import debug from 'debug';
// const log = debug('infect:InfoOverlay');

export default @observer class InfoOverlay extends React.Component {

    /**
     * Overlay content contains HTML; it's safe to use as source is server/source code. This
     * requires us to pass a corresponding object to dangerouslySetInnerHTML.
     */
    @observable content = { __html: '' };

    /**
     * Contains all sections (equals h1 titles); is needed to create table of contents. Contains
     * objects with properties title and className.
     */
    @observable sections = [];


    /**
     * Callback for marked renderer. Adds section object to this.sections.
     * @param {string} title        Title of the section (h1)
     * @param {string} className    Class of the section; needed to scroll to section when menu
     *                              is clicked.
     */
    @action addSection(title, className) {
        this.sections.push({
            title,
            className,
        });
    }

    componentDidMount() {

        /* global window */
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
        this.handleHashChange();

        // When overlay becomes visible and content has not yet been fetched, get it. Do not fetch
        // content when app is loaded to not slow loading process down.
        reaction(
            // Fire reaction when info overlay is switched and when tenantConfig changes, as
            // tenantConfig may not be ready when user visits INFECT with #information hash
            () => [this.props.infoOverlay.visible, this.props.tenantConfig.config.get('frontend')],
            // Only fetch content once (when this.content.__html has not yet been set)
            ([visible]) => visible && this.content.__html === '' &&
                this.props.tenantConfig.config.get('frontend') && this.fetchContent(),
            { fireImmediately: true },
        );

    }

    async fetchContent() {
        const frontendConfig = this.props.tenantConfig.config.get('frontend');
        if (
            !frontendConfig.userInterface ||
            !frontendConfig.userInterface.aboutDocumentUrl
        ) {
            this.props.notifications.handle({
                message: `Property aboutDocumentUrl on tenantConfig.frontendConfig is missing; frontendConfig is ${JSON.stringify(frontendConfig)} instead. Cannot display info overlay.`,
                severity: severityLevels.warning,
            });
            return;
        }
        const contentPath = frontendConfig.userInterface.aboutDocumentUrl;
        let textContent;
        try {
            const rawContent = await fetch(contentPath);
            textContent = await rawContent.text();
        } catch (err) {
            this.props.notifications.handle(err);
            textContent = 'Content could not be loaded';
        }
        const { renderer, marked } = setupMarked(
            this.addSection.bind(this),
            frontendConfig.appStoreURLs || {},
        );
        const htmlContent = marked(textContent, { renderer: renderer });
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

    handleTableOfContentClick(event, className) {
        event.preventDefault();
        const sectionTitle = document.querySelector(`h1.${className}`);
        if (!sectionTitle) return;
        sectionTitle.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        return (
            <div className={ `overlay ${this.props.infoOverlay.visible ? 'overlay--open' : ''}` }>

                <InfoOverlayButton infoOverlay={this.props.infoOverlay} />

                <div className="overlay__menu">
                    <ol className="menu">
                        {this.sections.map(item => (
                            <li className={`menu-item ${item.className}`} key={item.className}>
                                <a
                                    href="#"
                                    onClick={(ev) => this.handleTableOfContentClick(ev, item.className)}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>

                <InfoOverlayButton infoOverlay={this.props.infoOverlay} />

                <div className="overlay__container">
                    <div className="overlay-markdown" dangerouslySetInnerHTML={this.content}></div>
                </div>

            </div>
        );
    }

}
