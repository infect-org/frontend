/**
* Bootstrap of the Infect application's frontend
*/

import InfectApp from './infectApp';
import ReactDOM from 'react-dom';
import React from 'react';
import Matrix from './components/matrix/matrix';
import {autorun, whyRun, useStrict} from 'mobx';

useStrict(true);

const config 			= {
	endpoints			: {
		apiPrefix		: '/src/js/test-data/'
		, bacteria		: 'bacteria.json'
		, antibiotics	: 'antibiotics.json'
		, resistances	: 'resistances.json'
	}
};



// Setup models
const app = new InfectApp(config);

/*autorun(() => {
	console.log('CHANGE', app.views.matrix.antibiotics);
	whyRun();
});*/


// React
console.log('views:', app.views);
ReactDOM.render(<Matrix matrix={app.views.matrix}/>, document.querySelector('Matrix'));
