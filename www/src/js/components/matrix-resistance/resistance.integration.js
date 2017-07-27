import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape';
import Resistance from './resistance.jsx';
import Antibiotic from '../../models/antibiotics/antibiotic';
import SubstanceClass from '../../models/antibiotics/substanceClass';


function setupData() {
	//const substanceClass


	const antibiotics = {
		getSortedAntibiotics: function() {

		}
	};
	const matrix = {
		circleRadius: 20
		, circleSpace: 5
		, topHeaderHeight: 150
		, leftHeaderWidth: 200
	};
	const resistances = {
		// Max for size
	};
	const bacteria = {

	};
	return {
		bacteria: bacteria
		, resistances: resistances
		, matrix: matrix
		, antibiotics: antibiotics
	};
}




test('displays resistance', (t) => {
	const rendered = shallow(<Resistance resistance={{resistance: 0.5}}/>);
	t.equal(rendered.find('text').text(), '0.5');
	t.end();
});


test('has correct position', (t) => {
	const data = setupData();
	const rendered = shallow(<Resistance matrix={data.matrix} antibiotics={data.antibiotics} bacteria={data.bacteria} resistances={data.resistances}/>);
});


test('has correct visibility', (t) => {

});

test('has correct radius', (t) => {

});