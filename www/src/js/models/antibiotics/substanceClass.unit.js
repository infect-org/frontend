import test from 'tape';
import SubstanceClass from './substanceClass';

test('throws if arguments are missing', (t) => {
	t.throws(() => new SubstanceClass());
	t.throws(() => new SubstanceClass(13, 'name', {}), /instance/);
	t.end();
});

test('returns parent substance classes', (t) => {
	const grandParent = new SubstanceClass(1, 'gp');
	const parent = new SubstanceClass(2, 'p', grandParent);
	const child = new SubstanceClass(3, 'ch', parent);
	t.equal(child.getParentSubstanceClasses().length, 2);
	t.equal(child.getParentSubstanceClasses()[0], parent);
	t.equal(child.getParentSubstanceClasses()[1], grandParent);
	t.end();
});

test('does not set parent if it\'s not provided', (t) => {
	t.equal(new SubstanceClass(1, 'name').hasOwnProperty('parent'), false);
	t.end();
});

test('stores additional properties', (t) => {
	const sc = new SubstanceClass(1, 'name', undefined, { color: 'red', 'order': 3 });
	t.equals(sc.color, 'red');
	t.equals(sc.order, 3);
	t.end();
});