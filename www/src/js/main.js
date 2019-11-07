/**
* Bootstrap of the Infect application's frontend
*/

import 'whatwg-fetch';
import 'regenerator-runtime/runtime';
import 'core-js/stable';

import { configure, observable, action } from 'mobx';
import debug from 'debug';
import InfectApp from '@infect/frontend-logic';
import ReactDOM from 'react-dom';
import React from 'react'; // Not needed here, but error is thrown if we don't import it

import Matrix from './components/matrix/matrix';
import MatrixHeader from './components/matrix/matrixHeader';
import FilterList from './components/filterList/filterList';
import SelectedFiltersList from './components/selectedFilters/selectedFiltersList';
import FilterListMenu from './components/filterListMenu/filterListMenu';
import MatrixLoadingOverlay from './components/matrixLoadingOverlay/matrixLoadingOverlay';
import FilterSearch from './components/filterSearch/filterSearch';
import Disclaimer from './components/disclaimer/disclaimer';
import Notifications from './components/notifications/notifications';
import GuidedTour from './components/guidedTour/guidedTour';
import AppBanner from './components/appBanner/appBanner';
import InfoOverlay from './components/infoOverlay/infoOverlay';
import InfoOverlayButton from './components/infoOverlay/infoOverlayButton';
import Drawer from './components/drawer/Drawer.jsx';
import SelectedDiagnosisFilter from './components/selectedFilters/SelectedDiagnosisFilter';
import OpenDiagnosisDrawerButton from './components/drawer/OpenDiagnosisDrawerButton.jsx';

import betaConfig from '../config/config.beta.js';
import liveConfig from '../config/config.live.js';

// Models limited to web app
import GuidedTourModel from './models/guidedTour/guidedTour';
import InfoOverlayModel from './models/infoOverlay/infoOverlay';

const log = debug('infect:Main');
configure({ enforceActions: 'always' });


// Get config based on environment
/* global window */
const isBeta = window.location.hostname.includes('beta.') ||
    window.location.hostname === 'localhost';
const config = isBeta ? betaConfig : liveConfig;
log('Is beta? %o. config is %o', isBeta, config);

// If URL's query params include ?preview or &preview, also load guideline data that has not yet
// ben published. See https://github.com/infect-org/issues/issues/47.
// TODO: Solve nicely when new API endpoints are ready (GPC)
if (/(\?|&)preview/.test(window.location.search)) {
    const concernedEndpoints = [
        'diagnoses',
        'guidelines',
        'therapies',
        'therapyPriorities',
        'diagnosisClass',
        'therapyCompounds',
        'diagnosisBacteria',
    ];
    concernedEndpoints.forEach((endpoint) => { config.endpoints[endpoint] += '?showAllData=true'; });
}


// Setup models that are shared between mobile and web app
const app = new InfectApp(config);
try {
    app.initialize();
    log('App initialized, is %o', app);
} catch (err) {
    app.errorHandler.handle(err);
}


// Web specific frontend models
const infoOverlayModel = new InfoOverlayModel();
const guidedTourModel = new GuidedTourModel(infoOverlayModel);


// React
log('views:', app.views);

/* global document */
function renderReact() {

    ReactDOM.render(
        <Matrix
            matrix={app.views.matrix}
            filters={app.filterValues}
            selectedFilters={app.selectedFilters}
            guidelines={app.guidelines}
        />,
        document.querySelector('Matrix'),
    );

    ReactDOM.render(
        <MatrixHeader
            matrix={app.views.matrix}
            filters={app.filterValues}
            selectedFilters={app.selectedFilters}
            guidelines={app.guidelines}
        />,
        document.querySelector('MatrixHeader'),
    );

    ReactDOM.render(
        <FilterList
            mostUsedFilters={app.mostUsedFilters}
            filterValues={app.filterValues}
            selectedFilters={app.selectedFilters}
            offsetFilters={app.offsetFilters}
            guidelines={app.guidelines}
        />,
        document.querySelector('FilterList'),
    );

    ReactDOM.render(
        <SelectedFiltersList selectedFilters={app.selectedFilters}/>,
        document.querySelector('SelectedFiltersList'),
    );

    ReactDOM.render(
        <FilterListMenu
            mostUsedFilters={app.mostUsedFilters}
            guidelines={app.guidelines}
        />,
        document.querySelector('FilterListMenu'),
    );

    ReactDOM.render(
        <FilterSearch
            searchMatrixFilters={app.filterValues.search.bind(app.filterValues)}
            isMatrixFilterSelected={app.selectedFilters.isSelected.bind(app.selectedFilters)}
            toggleMatrixFilter={app.selectedFilters.toggleFilter.bind(app.selectedFilters)}
            searchGuidelineFilters={app.guidelines.search.bind(app.guidelines)}
            guidelines={app.guidelines}
        />,
        document.querySelector('FilterSearch'),
    );

    ReactDOM.render(
        <MatrixLoadingOverlay
            stores={[app.bacteria, app.antibiotics, app.resistances, app.substanceClasses]}
        />,
        document.querySelector('MatrixLoadingOverlay'),
    );

    ReactDOM.render(
        <Disclaimer infoOverlay={infoOverlayModel} guidedTour={guidedTourModel} />,
        document.querySelector('Disclaimer'),
    );

    ReactDOM.render(
        <GuidedTour guidedTour={guidedTourModel} />,
        document.querySelector('GuidedTour'),
    );

    ReactDOM.render(
        <AppBanner appBanner={app.appBanner} />,
        document.querySelector('AppBanner'),
    );

    ReactDOM.render(
        <InfoOverlay guidedTour={guidedTourModel} infoOverlay={infoOverlayModel} />,
        document.querySelector('InfoOverlay'),
    );

    ReactDOM.render(
        <InfoOverlayButton infoOverlay={infoOverlayModel} />,
        document.querySelector('InfoOverlayButton'),
    );

    ReactDOM.render(
        <OpenDiagnosisDrawerButton drawerViewModel={app.views.drawer} />,
        document.querySelector('OpenDiagnosisDrawerButton'),
    );

    ReactDOM.render(
        <Notifications errors={app.errorHandler.errors} />,
        document.querySelector('Notifications'),
    );

    ReactDOM.render(
        <Drawer drawerViewModel={app.views.drawer} />,
        document.querySelector('Drawer'),
    );

    ReactDOM.render(
        <SelectedDiagnosisFilter guidelines={app.guidelines} />,
        document.querySelector('SelectedDiagnosisFilter'),
    );

}


// Edge fails on reloads, sometimes. *Might* be a caching issue where cached JS is executed before
// it appears in DOM. Wait until dom is loaded – just to be sure.
document.addEventListener('DOMContentLoaded', renderReact);
if (document.readyState !== 'loading') renderReact();

