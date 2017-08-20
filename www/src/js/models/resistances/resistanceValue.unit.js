import test from 'tape';
import ResistanceValue from './resistanceValue';
import resistanceTypes from './resistanceTypes';

test('throws on invalid values', (t) => {
	t.throws(() => new ResistanceValue(), /not known/);
	t.throws(() => new ResistanceValue('invalid'), /not known/);
	t.throws(() => new ResistanceValue('class', -1), /between/);
	t.throws(() => new ResistanceValue('class', 1.3), /between/);
	t.throws(() => new ResistanceValue('class', 'text', /number/));
	t.throws(() => new ResistanceValue('class', 1, 1.5, /integer/));
	t.throws(() => new ResistanceValue('class', 1, 'text', /integer/));	
	t.end();
});

test('stores type and value correctly', (t) => {
	const resVal = new ResistanceValue('class', '0.9', 5);
	t.equal(resVal.value, 0.9);
	t.equal(resVal.sampleSize, 5);
	t.equal(resVal.type, resistanceTypes.class);
	t.end();
});