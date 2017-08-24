import test from 'tape';
import Antibiotic from './antibiotic';
import SubstanceClass from './substanceClass';

test('throws on invalid arguments', (t) => {
	t.throws(() => new Antibiotic(), /missing/);
	t.end();
});

test('returns corret parent substanceClasses', (t) => {
	const grandParent = new SubstanceClass(1, 'grandParent');
	const parent = new SubstanceClass(2, 'parent', grandParent);
	const child = new SubstanceClass(3, 'child', parent);
	const ab = new Antibiotic(1, 'ab', child);
	t.deepEqual(ab.getSubstanceClasses(), [child, parent, grandParent]);
	t.end();
});