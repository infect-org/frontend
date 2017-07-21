import test from 'tape';
import Antibiotic from './antibiotic';
import AntibioticStore from './antibioticStore';
import SubstanceClass from './substanceClass';

test('antibioticStore.sortedAntibiotics returns correctly sorted antibiotics', (t) => {

	const sc1 = new SubstanceClass(1, 'sc-5');
	const sc2 = new SubstanceClass(2, 'sc-3', sc1);
	const sc3 = new SubstanceClass(3, 'sc-1');
	const sc4 = new SubstanceClass(4, 'sc-9', sc3);

	const store = new AntibioticStore();
	store.addAntibiotic(new Antibiotic(1, 'ab-' + 1, sc1));
	store.addAntibiotic(new Antibiotic(2, 'ab-' + 2, sc1));
	store.addAntibiotic(new Antibiotic(3, 'ab-' + 4, sc2));
	store.addAntibiotic(new Antibiotic(4, 'ab-' + 3, sc2));
	store.addAntibiotic(new Antibiotic(5, 'ab-' + 5, sc3));
	store.addAntibiotic(new Antibiotic(6, 'ab-' + 6, sc4));

	const result = store.sortedAntibiotics;
	t.deepEqual(result, [
		store.getAntibioticById(5)
		, store.getAntibioticById(6)
		, store.getAntibioticById(1)
		, store.getAntibioticById(2)
		, store.getAntibioticById(4)
		, store.getAntibioticById(3)
	]);

	t.end();

});