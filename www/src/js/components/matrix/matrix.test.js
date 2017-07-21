import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape';
import Matrix from './matrix.jsx';

test('renders correctly', (t) => {
	const matrix = shallow(<Matrix/>);
	t.equal(matrix.is('svg'), true);
	t.end();
});


test.skip('measures tests', (t) => {

});