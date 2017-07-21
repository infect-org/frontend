import test from 'tape';
import SubstanceClass from './substanceClass';

test('throws if arguments are missing', (t) => {
	t.throws(() => new SubstanceClass());
	t.end();
});

test('does not set parent if it\'s not provided', (t) => {
	t.equal(new SubstanceClass(1, 'name').hasOwnProperty('parent'), false);
	t.end();
});