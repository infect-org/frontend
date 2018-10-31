/**
* Bootstrap of the Infect application's frontend
*/

import '@babel/polyfill';

import { configure } from 'mobx';
import debug from 'debug';
import InfectApp from 'infect-frontend-logic';
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
import InfoOverlay from './components/infoOverlay/infoOverlay';
import InfoOverlayButton from './components/infoOverlay/infoOverlayButton';
// Models limited to web app
import GuidedTourModel from './models/guidedTour/guidedTour';
import InfoOverlayModel from './models/infoOverlay/infoOverlay';

const log = debug('infect:Main');
configure({ enforceActions: 'always' });

/* global window */
const isBeta = window.location.hostname.includes('beta.') ||
    window.location.hostname === 'localhost';
// const envPrefix = isBeta ? 'beta.' : '';
const envPrefix = 'rda.';
log('Is beta? %o. envPrefix is %s', isBeta, envPrefix);

// const protocol = window.location.protocol;
const protocol = 'https:';

const config = {
    endpoints: {
        apiPrefix: `${protocol}//${envPrefix}infect.info/`,
        bacteria: 'pathogen.bacterium',
        antibiotics: 'substance.compound',
        resistances: 'rda.data',
        substanceClasses: 'substance.substanceClass',
        regions: 'generics.region',
        countries: 'generics.country',
        ageGroups: 'generics.ageGroup',
        hospitalStatus: 'generics.hospitalStatus',
    },
};


// Setup models that are shared between mobile and web app
const app = new InfectApp(config);
try {
    app.initialize();
} catch (err) {
    app.errorHandler.handle(err);
}

const infoOverlayModel = new InfoOverlayModel();
const guidedTourModel = new GuidedTourModel(infoOverlayModel);


// React
log('views:', app.views);

/* global document */
function renderReact() {

    ReactDOM.render(
        <Matrix matrix={ app.views.matrix } filters={ app.filterValues }
            selectedFilters={ app.selectedFilters } />,
        document.querySelector('Matrix'),
    );

    ReactDOM.render(
        <MatrixHeader matrix={ app.views.matrix } filters={ app.filterValues }
            selectedFilters={ app.selectedFilters }/>,
        document.querySelector('MatrixHeader'),
    );

    ReactDOM.render(
        <FilterList mostUsedFilters={ app.mostUsedFilters } filterValues={ app.filterValues }
            selectedFilters={ app.selectedFilters }
            offsetFilters={ app.offsetFilters }/>,
        document.querySelector('FilterList'),
    );

    ReactDOM.render(<SelectedFiltersList selectedFilters={ app.selectedFilters }/>, document.querySelector('SelectedFiltersList'));
    ReactDOM.render(<FilterListMenu mostUsedFilters={ app.mostUsedFilters }/>, document.querySelector('FilterListMenu'));
    ReactDOM.render(<FilterSearch filterValues={ app.filterValues } selectedFilters={ app.selectedFilters }/>, document.querySelector('FilterSearch'));
    ReactDOM.render(<MatrixLoadingOverlay stores={ [app.bacteria, app.antibiotics, app.resistances, app.substanceClasses] } />, document.querySelector('MatrixLoadingOverlay'));
    ReactDOM.render(<Disclaimer infoOverlay={ infoOverlayModel } guidedTour={ guidedTourModel }/>, document.querySelector('Disclaimer'));
    ReactDOM.render(<GuidedTour guidedTour={ guidedTourModel }/>, document.querySelector('GuidedTour'));
    ReactDOM.render(<InfoOverlay guidedTour={ guidedTourModel } infoOverlay={ infoOverlayModel }/>, document.querySelector('InfoOverlay'));
    ReactDOM.render(<InfoOverlayButton infoOverlay={ infoOverlayModel }/>, document.querySelector('InfoOverlayButton'));    

    ReactDOM.render(
        <Notifications/>,
        document.querySelector('Notifications'),
    );
}


// Edge fails on reloads, sometimes. *Might* be a caching issue where cached JS is executed before
// it appears in DOM. Wait until dom is loaded – just to be sure.
document.addEventListener('DOMContentLoaded', renderReact);
if (document.readyState !== 'loading') renderReact();
