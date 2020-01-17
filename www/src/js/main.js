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

import Matrix from './components/matrix/matrix.jsx';
import MatrixHeader from './components/matrix/matrixHeader.jsx';
import FilterList from './components/filterList/filterList.jsx';
import SelectedFiltersList from './components/selectedFilters/selectedFiltersList.jsx';
import FilterListMenu from './components/filterListMenu/filterListMenu.jsx';
import MatrixLoadingOverlay from './components/matrixLoadingOverlay/matrixLoadingOverlay.jsx';
import FilterSearch from './components/filterSearch/filterSearch.jsx';
import Disclaimer from './components/disclaimer/disclaimer.jsx';
import Notifications from './components/notifications/notifications.jsx';
import GuidedTour from './components/guidedTour/guidedTour.jsx';
import AppBanner from './components/appBanner/appBanner.jsx';
import InfoOverlay from './components/infoOverlay/infoOverlay.jsx';
import InfoOverlayButton from './components/infoOverlay/infoOverlayButton.jsx';
import Drawer from './components/drawer/Drawer.jsx';
import SelectedDiagnosisFilter from './components/selectedFilters/SelectedDiagnosisFilter.jsx';
import TenantLogo from './components/tenantLogo/TenantLogo.jsx';
import TenantRunner from './components/tenantRunner/TenantRunner.jsx';

import getURL from '../config/getURL.js';

// Models limited to web app
import GuidedTourModel from './models/guidedTour/guidedTour';
import InfoOverlayModel from './models/infoOverlay/infoOverlay';

const log = debug('infect:Main');
configure({ enforceActions: 'always' });



// Setup models that are shared between mobile and web app
const app = new InfectApp({ getURL });
try {
    app.initialize();
    log('App initialized, is %o', app);
} catch (err) {
    app.notificationCenter.handle(err);
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
            tenantConfig={app.tenantConfig}
            ageGroupStore={app.ageGroupStore}
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
            stores={[
                app.bacteria,
                app.antibiotics,
                app.resistances,
                app.substanceClasses,
            ]}
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
        <InfoOverlay
            guidedTour={guidedTourModel}
            infoOverlay={infoOverlayModel}
            tenantConfig={app.tenantConfig}
            notifications={app.notificationCenter}
        />,
        document.querySelector('InfoOverlay'),
    );

    ReactDOM.render(
        <TenantRunner
            tenantConfig={app.tenantConfig}
            notifications={app.notificationCenter}
        />,
        document.querySelector('TenantRunner'),
    );

    ReactDOM.render(
        <InfoOverlayButton infoOverlay={infoOverlayModel} />,
        document.querySelector('InfoOverlayButton'),
    );

    ReactDOM.render(
        <Notifications errors={app.notificationCenter.notifications} />,
        document.querySelector('Notifications'),
    );

    ReactDOM.render(
        <Drawer drawerViewModel={app.views.drawer} app={app} />,
        document.querySelector('Drawer'),
    );

    ReactDOM.render(
        <SelectedDiagnosisFilter guidelines={app.guidelines} />,
        document.querySelector('SelectedDiagnosisFilter'),
    );

    ReactDOM.render(
        <TenantLogo tenantConfig={app.tenantConfig} />,
        document.querySelector('TenantLogo'),
    );

}


// Edge fails on reloads, sometimes. *Might* be a caching issue where cached JS is executed before
// it appears in DOM. Wait until dom is loaded – just to be sure.
document.addEventListener('DOMContentLoaded', renderReact);
if (document.readyState !== 'loading') renderReact();

