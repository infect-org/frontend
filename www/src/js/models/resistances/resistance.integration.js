import test from 'tape';
import Resistance from './resistance';
import Antibiotic from '../antibiotics/antibiotic';
import Bacterium from '../bacteria/bacterium';
import SubstanceClass from '../antibiotics/substanceClass';


function setupData() {
	const substanceClass = new SubstanceClass(5, 'testSC');
	const bacterium = new Bacterium(4, 'testB');
	const antibiotic = new Antibiotic(4, 'testA', substanceClass);
	const resistance = new Resistance([
		{type: 'class', sampleSize: 50, value: 0.3}
		, {type: 'import', sampleSize: 40, value: 0.7}
		, {type: 'default', sampleSize: 20, value: 0.1}
	], antibiotic, bacterium);
	return {
		substanceClass
		, antibiotic
		, bacterium
		, resistance
	};
}


test('throws on invalid arguments', (t) => {
	t.throws(() => new Resistance(), /Array/);
	t.throws(() => new Resistance([]), /antibiotic/);
	t.throws(() => new Resistance([], 1), /bacterium/);
	t.end();
});

test('sorts by precision', (t) => {
	const { resistance } = setupData();
	t.deepEqual(resistance.getValuesByPrecision().map((val) => val.value), [0.7, 0.3, 0.1]);
	t.end();
});
