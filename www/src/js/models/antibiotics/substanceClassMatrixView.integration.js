import test from 'tape';
import SubstanceClassMatrixView from './substanceClassMatrixView';
import SubstanceClass from './substanceClass';

test('constructor', (t) => {
	const sc = new SubstanceClass(1, 'test');
	const scmv = new SubstanceClassMatrixView(sc);
	t.equals(scmv.substanceClass, sc);
	t.end();
});