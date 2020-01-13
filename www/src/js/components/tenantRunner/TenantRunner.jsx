import React from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import debug from 'debug';
import { severityLevels } from '@infect/frontend-logic';

const log = debug('infect:TenantRunner');


/**
 * Executes tenant related functions that cannot be tied to a real React component:
 * - loads Google Analytics
 * - sets CSS variables
 */
export default @observer class InfoOverlay extends React.Component {


    componentDidMount() {
        // As soon as tenant data has been fetched from server, update DOM
        reaction(
            () => this.props.tenantConfig.config &&
                this.props.tenantConfig.config.get('frontend'),
            (frontendConfig, disposer) => {
                log('frontend config is %o', frontendConfig);
                if (typeof frontendConfig !== 'object') {
                    this.props.notifications.handle({
                        message: `Property frontendConfig on tenantConfig must be an object, is ${JSON.stringify(frontendConfig)} instead.`,
                        severity: severityLevels.warning,
                    });
                    return;
                }
                this.updateCSSVariables(frontendConfig);
                this.initializeGoogleAnalytics(frontendConfig);
                // Let's assume that tenantConfig does not change once it has been fetched.
                // Therefore we can and should dispose the reaction.
                disposer.dispose();
            },
        );
    }


    /**
     * @param {object} userInterfaceConfig    frontend.userInterface config from tenantConfig
     */
    updateCSSVariables(frontendConfig) {

        if (
            !frontendConfig.userInterface ||
            typeof frontendConfig.userInterface !== 'object' ||
            !frontendConfig.userInterface.darkColor ||
            !frontendConfig.userInterface.lightColor
        ) {
            this.props.notifications.handle({
                message: `Expected userIterface config to be an object with properties darkColor and lightColor, got ${JSON.stringify(frontendConfig.userInterface)} instead.`,
                severity: severityLevels.warning,
            });
            return;
        }
        const { lightColor, darkColor } = frontendConfig.userInterface;
        /* global document */
        const documentRoot = document.documentElement;
        documentRoot.style.setProperty('--color--accent-1', lightColor);
        documentRoot.style.setProperty('--color--accent-2', darkColor);
        log('Colors set to %o and %o', lightColor, darkColor);
    }


    initializeGoogleAnalytics(frontendConfig) {

        if (!frontendConfig.analytics) {
            this.props.notifications.handle({
                message: `Expected analytics config to be an object with property googleAnalyticsTag, received ${JSON.stringify(frontendConfig.analytics)} instead.`,
                severity: severityLevels.warning,
            });
            return;
        }

        /* global window */
        const host = window.location.hostname;

        // Don't track on local dev installation
        if (host === 'localhost') return;

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-108372802-1');

        log('Google Analytics initialized');

    }


    render() {
        return null;
    }

}
