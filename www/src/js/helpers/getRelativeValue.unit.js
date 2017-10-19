import test from 'tape';
import getRelativeValue from './getRelativeValue';

test('throws if bounds are exceeded', (t) => {
	t.throws(() => getRelativeValue(2, 4, 6));
	t.throws(() => getRelativeValue(2, 0, 1));
	t.end();
});

test('returns correct values', (t) => {
	t.equal(getRelativeValue(2, 0, 4), 0.5);
	t.equal(getRelativeValue(2, 0, 4, 0.5), 0.75);
	t.equal(getRelativeValue(4, 0, 4, 0.5), 1);
	t.equal(getRelativeValue(4, 3, 4, 0.5), 1);
	t.end();
});