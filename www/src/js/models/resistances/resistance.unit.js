import test from 'tape';
import Resistance from './resistance';

test('throws on invalid arguments', (t) => {
	t.throws(() => new Resistance(), /Array/);
	t.end();
});

test('sorts by precision', (t) => {
	const res = new Resistance([
		{type: 'class', sampleSize: 50, value: 0.3}
		, {type: 'import', sampleSize: 40, value: 0.7}
		, {type: 'default', sampleSize: 20, value: 0.1}
	]);
	t.deepEqual(res.getValuesByPrecision().map((val) => val.value), [0.7, 0.3, 0.1]);
	t.end();
});