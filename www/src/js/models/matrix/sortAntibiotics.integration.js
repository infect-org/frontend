import test from 'tape';
import Antibiotic from '../antibiotics/antibiotic';
import SubstanceClass from '../antibiotics/substanceClass';
import sortAntibiotics from './sortAntibiotics';

test('antibioticStore.sortedAntibiotics returns correctly sorted antibiotics', (t) => {

	const sc1 = new SubstanceClass(1, 'sc-5');
	const sc2 = new SubstanceClass(2, 'sc-3', sc1);
	const sc3 = new SubstanceClass(3, 'sc-1');
	const sc4 = new SubstanceClass(4, 'sc-9', sc3);

	const antibiotics = [
		  new Antibiotic(1, 'ab-' + 1, sc1)
		, new Antibiotic(2, 'ab-' + 2, sc1)
		, new Antibiotic(3, 'ab-' + 4, sc2)
		, new Antibiotic(4, 'ab-' + 3, sc2)
		, new Antibiotic(5, 'ab-' + 5, sc3)
		, new Antibiotic(6, 'ab-' + 6, sc4)
	];

	const result = sortAntibiotics(antibiotics);
	t.deepEqual(result, [
		  antibiotics[4]
		, antibiotics[5]
		, antibiotics[0]
		, antibiotics[1]
		, antibiotics[3]
		, antibiotics[2]
	]);

	t.end();

});
