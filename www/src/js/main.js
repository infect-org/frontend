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


const config = {
	endpoints: {
		apiPrefix: `http://${ envPrefix }api.infect.info/`,
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
ReactDOM.render(<InfoOverlay guidedTour={ app.guidedTour } infoOverlay={ app.infoOverlay }/>, document.querySelector('InfoOverlay'));
ReactDOM.render(<InfoOverlayButton infoOverlay={ app.infoOverlay }/>, document.querySelector('InfoOverlayButton'));
