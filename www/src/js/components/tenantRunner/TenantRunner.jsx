import React from 'react';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import debug from 'debug';
import { severityLevels } from '@infect/frontend-logic';
import cssVars from 'css-vars-ponyfill';

const log = debug('infect:TenantRunner');


/**
 * Executes tenant related functions that cannot be tied to a real React component:
 * - loads Google Analytics
 * - sets CSS variables
 * - sets Favicon
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
                this.updateFavicon(frontendConfig);
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
        // Use this code later when we can drop IE11 support 🙏
        // const documentRoot = document.documentElement;
        // documentRoot.style.setProperty('--color--accent-1', lightColor);
        // documentRoot.style.setProperty('--color--accent-2', darkColor);
        // IE11: https://jhildenbiddle.github.io/css-vars-ponyfill/#/
        cssVars({
            variables: {
                '--color--accent-1': lightColor,
                '--color--accent-2': darkColor,
            }
        });
        log('Colors set to %o and %o', lightColor, darkColor);
    }


    updateFavicon(frontendConfig) {

        if (
            !frontendConfig.userInterface ||
            typeof frontendConfig.userInterface !== 'object' ||
            !frontendConfig.userInterface.darkColor
        ) {
            this.props.notifications.handle({
                message: `Expected userIterface config to be an object with property darkColor, got ${JSON.stringify(frontendConfig.userInterface)} instead.`,
                severity: severityLevels.warning,
            });
            return;
        }

        // There are multiple favicons (16x16 and 32x32). Replace all of them.
        const favicons = document.querySelectorAll('link[rel="icon"]');
        if (!favicons.length) {
            // Favicon is just a «nice to have». Handle errors very discreetly.
            console.warn('Could not find favicon, is %o', favicon);
            return;
        }

        const color = frontendConfig.userInterface.darkColor;
        const faviconSize = 32;

        const canvas = document.createElement('canvas');
        canvas.width = faviconSize;
        canvas.height = faviconSize;

        // Create 3 levels of circles
        const createCircle = (level, [x, y], radius, maxDepth) => {
            if (level > maxDepth - 1) return;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            // Draw 8 child circles around parent circle. If level is 0, only 1 circle is needed. 
            for (let number = 0; number < 6; number++) {
                // Angle of the current circle in relation to the previous circle; 0 is 3 o'clock,
                // Math.PI is 9 o'clock (unit circle)
                const angle = (Math.PI * 2) / 6 * number;
                // Distance from center of parent to center of child circle
                const centerDistance = radius * 2.4;
                const newX = x + Math.cos(angle) * centerDistance;
                const newY = y + Math.sin(angle) * centerDistance;
                createCircle(level + 1, [newX, newY], radius / 3, maxDepth);
            }
        };
        
        const context = canvas.getContext('2d');
        context.fillStyle = color;
        createCircle(0, [faviconSize / 2, faviconSize / 2], faviconSize / 8, 8);

        // To test, use size of ~640
        // document.body.prepend(canvas);

        for (const favicon of favicons) {
            favicon.href = canvas.toDataURL('image/png');
        }
    }


    initializeGoogleAnalytics(frontendConfig) {

        if (!frontendConfig.analytics ||
            !frontendConfig.analytics.googleAnalyticsTag ||
            typeof frontendConfig.analytics.googleAnalyticsTag !== 'string'
        ) {
            this.props.notifications.handle({
                message: `Expected analytics config to be an object with property googleAnalyticsTag (string), received ${JSON.stringify(frontendConfig.analytics)} instead.`,
                severity: severityLevels.warning,
            });
            return;
        }

        /* global window */
        const host = window.location.hostname;

        // Don't track on local dev installation
        if (host === 'localhost') {
            console.log('Dev environment; don\'t add Analytics');
            return;
        }

        // Start: Code from Google
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', frontendConfig.analytics.googleAnalyticsTag);
        // End: Code from Google

        log('Google Analytics initialized');

    }


    render() {
        return null;
    }

}
