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
import GuidedTourButton from './components/guidedTour/guidedTourButton';
import InfoOverlay from './components/infoOverlay/infoOverlay';
import InfoOverlayButton from './components/infoOverlay/infoOverlayButton';
import {autorun, whyRun, useStrict} from 'mobx';
import debug from 'debug';
const log = debug('infect:Main');

useStrict(true);

const isBeta = window.location.hostname.includes('beta.');
const dataFolder = isBeta ? 'beta' : 'live';
log('Is beta? %o – Data folder is %s', isBeta, dataFolder);


const config 				= {
	endpoints				: {
		apiPrefix			: `/src/js/data/${ dataFolder }/`
		, bacteria			: 'bacteria.json'
		, antibiotics		: 'antibiotics.json'
		, resistances		: 'resistances.json'
		, substanceClasses	: 'substanceClasses.json'
	}
};



// Setup models
let app;
app = new InfectApp(config);

/*autorun(() => {
	console.log('CHANGE', app.views.matrix.antibiotics);
	whyRun();
});*/


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
