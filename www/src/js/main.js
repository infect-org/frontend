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
import FilterSearch from './components/filterSearch/filterSearch';
import {autorun, whyRun, useStrict} from 'mobx';
import debug from 'debug';
const log = debug('infect:Main');

useStrict(true);

const config 				= {
	endpoints				: {
		apiPrefix			: '/src/js/test-data/'
		, bacteria			: 'bacteria.json'
		, antibiotics		: 'antibiotics.json'
		, resistances		: 'resistances.json'
		, substanceClasses	: 'substanceClasses.json'
	}
};



// Setup models
const app = new InfectApp(config);

/*autorun(() => {
	console.log('CHANGE', app.views.matrix.antibiotics);
	whyRun();
});*/


// React
log('views:', app.views);
ReactDOM.render(<Matrix matrix={ app.views.matrix } filters={ app.filterValues } selectedFilters={ app.selectedFilters }/>, document.querySelector('Matrix'));
ReactDOM.render(<MatrixHeader matrix={ app.views.matrix } filters={ app.filterValues } selectedFilters={ app.selectedFilters }/>, document.querySelector('MatrixHeader'));
ReactDOM.render(<FilterList filterValues={ app.filterValues } selectedFilters={ app.selectedFilters }/>, document.querySelector('FilterList'));
ReactDOM.render(<SelectedFiltersList selectedFilters={ app.selectedFilters }/>, document.querySelector('SelectedFiltersList'));
ReactDOM.render(<FilterListMenu/>, document.querySelector('FilterListMenu'));
ReactDOM.render(<FilterSearch filterValues={ app.filterValues } selectedFilters={ app.selectedFilters }/>, document.querySelector('FilterSearch'));