import React from 'react';
import ReactDOM from 'react-dom';
import Matrix from './matrix';
import Resistance from './resistance';
import Stage from './stage';
import {spy} from 'mobx';

const model = {
	resistances: []
	, stage: new Stage()
};


Array.from(new Array(900)).map((item, index) => {
	model.resistances.push(new Resistance(index, model.stage));
});
console.error(model);

ReactDOM.render(<Matrix store={model}/>, document.getElementById('main'));