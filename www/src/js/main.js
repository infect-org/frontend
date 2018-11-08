/**
* Bootstrap of the Infect application's frontend
*/

import InfectApp from './infectApp';
import ReactDOM from 'react-dom';
import React from 'react';
import Matrix from './components/matrix/matrix';
import MatrixHeader from './components/matrix/matrixHeader';
import FilterList from './components/filterList/filterList';
import SelectedFiltersList from './components/selectedFilters/selectedFiltersList';
import FilterListMenu from './components/filterListMenu/filterListMenu';
import MatrixLoadingOverlay from './components/matrixLoadingOverlay/matrixLoadingOverlay';
import FilterSearch from './components/filterSearch/filterSearch';
import Disclaimer from './components/disclaimer/disclaimer';
import GuidedTour from './components/guidedTour/guidedTour';
import AppBanner from './components/appBanner/appBanner';
import InfoOverlay from './components/infoOverlay/infoOverlay';
import InfoOverlayButton from './components/infoOverlay/infoOverlayButton';
import { useStrict } from 'mobx';
import debug from 'debug';
const log = debug('infect:Main');

useStrict(true);

const isBeta = window.location.hostname.includes('beta.') ||
	window.location.hostname === 'localhost';
const envPrefix = isBeta ? 'beta.' : '';
log('Is beta? %o. envPrefix is %s', isBeta, envPrefix);

const protocol = window.location.protocol;
const config = {
	endpoints: {
		apiPrefix: `${ protocol }//${ envPrefix }api.infect.info/`,
		bacteria: 'pathogen.bacterium',
		antibiotics: 'substance.compound',
		resistances: 'rda.resistance',
		substanceClasses: 'substance.substanceClass',
		regions: 'generics.region',
		countries: 'generics.country',
	}
};


// Setup models
let app;
app = new InfectApp(config);



// React
log('views:', app.views);

// Edge fails on reloads, sometimes. *Might* be a caching issue where cached JS is executed before it
// appears in DOM. Wait until dom is loaded – just to be sure.
document.addEventListener('DOMContentLoaded', renderReact);
if (document.readyState !== 'loading') renderReact();

function renderReact() {
	ReactDOM.render(<Matrix matrix={ app.views.matrix } filters={ app.filterValues } selectedFilters={ app.selectedFilters } />,
		document.querySelector('Matrix'));
	ReactDOM.render(<MatrixHeader matrix={ app.views.matrix } filters={ app.filterValues } selectedFilters={ app.selectedFilters }/>, document.querySelector('MatrixHeader'));
	ReactDOM.render(<FilterList mostUsedFilters={ app.mostUsedFilters } filterValues={ app.filterValues } selectedFilters={ app.selectedFilters }
		offsetFilters={ app.offsetFilters }/>, document.querySelector('FilterList'));
	ReactDOM.render(<SelectedFiltersList selectedFilters={ app.selectedFilters }/>, document.querySelector('SelectedFiltersList'));
	ReactDOM.render(<FilterListMenu mostUsedFilters={ app.mostUsedFilters }/>, document.querySelector('FilterListMenu'));
	ReactDOM.render(<FilterSearch filterValues={ app.filterValues } selectedFilters={ app.selectedFilters }/>, document.querySelector('FilterSearch'));
	ReactDOM.render(<MatrixLoadingOverlay stores={ [app.bacteria, app.antibiotics, app.resistances, app.substanceClasses] } />, document.querySelector('MatrixLoadingOverlay'));
	ReactDOM.render(<Disclaimer infoOverlay={ app.infoOverlay } guidedTour={ app.guidedTour }/>, document.querySelector('Disclaimer'));
	ReactDOM.render(<GuidedTour guidedTour={ app.guidedTour }/>, document.querySelector('GuidedTour'));
    ReactDOM.render(<AppBanner appBanner={ app.appBanner }/>, document.querySelector('AppBanner'));
    ReactDOM.render(<InfoOverlay guidedTour={ app.guidedTour } infoOverlay={ app.infoOverlay }/>, document.querySelector('InfoOverlay'));
	ReactDOM.render(<InfoOverlayButton infoOverlay={ app.infoOverlay }/>, document.querySelector('InfoOverlayButton'));
}
