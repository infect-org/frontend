import test from 'tape';
import MatrixView from './matrixView';
import Antibiotic from '../antibiotics/antibiotic';
import AntibioticMatrixView from '../antibiotics/antibioticMatrixView';
import SubstanceClassMatrixView from '../antibiotics/substanceClassMatrixView';
import SubstanceClass from '../antibiotics/substanceClass';
import Bacterium from '../bacteria/bacterium';
import Resistance from '../resistances/resistance';

function createSubstanceClass(parent, name = 'testSC', id = Math.random()) {
	return new SubstanceClass(id, name, parent);
}

function ceateAntibiotic(substanceClass, name = 'testAB', id = Math.random()) {
	return new Antibiotic(id, name, substanceClass);
}

function createBacterium(name = 'testBact', id = Math.random()) {
	return new Bacterium(id, name);
}

function createResistance(ab, bact, resistances) {
	resistances = resistances || [
		{type: 'class', value: 0.3, sampleSize: 50}
		, {type: 'import', value: 0.4, sampleSize: 100}
	];
	return new Resistance(resistances, ab, bact);
}

function createValidSet() {
	const sc1 = createSubstanceClass();
	const sc2 = createSubstanceClass(sc1);
	const sc3 = createSubstanceClass();
	const ab1 = ceateAntibiotic(sc2);
	const ab2 = ceateAntibiotic(sc2);
	const ab3 = ceateAntibiotic(sc3);
	const bact1 = createBacterium('b');
	const bact2 = createBacterium('a');
	const res1 = createResistance(ab1, bact1);
	const res2 = createResistance(ab1, bact2);
	const res3 = createResistance(ab2, bact2, [{type: 'default', value: 1, sampleSize: 59}]);
	const matrix = new MatrixView();
	return {
		matrix: matrix
		, antibiotics: [ab1, ab2, ab3]
		, bacteria: [bact1, bact2]
		, substanceClasses: [sc1, sc2, sc3]
		, resistances: [res1, res2, res3]
	};
}






test('addData adds all data passed', (t) => {
	const set = createValidSet();
	set.matrix.addData(set.antibiotics, set.bacteria, set.resistances);
	t.equal(set.matrix.antibiotics.length, 3);
	t.equal(set.matrix.sortedBacteria.length, 2);
	t.equal(set.matrix.resistances.length, 3);
	t.equal(set.matrix.substanceClasses.length, 3);
	t.end();
});


test('fails if duplicate antibiotics are added', (t) => {
	const sc = createSubstanceClass();
	const ab1 = ceateAntibiotic(sc, 'test1', 1);
	const ab2 = ceateAntibiotic(sc, 'test2', 1);
	const matrix = new MatrixView();
	matrix.addAntibiotic(ab1);
	t.throws(() => matrix.addAntibiotic(ab2), /duplicate/);
	t.end();
});


test('sets and returns antibiotics and substanceClasses', (t) => {

	const set = createValidSet();
	const {matrix, antibiotics, substanceClasses} = set;
	matrix.addAntibiotic(antibiotics[0]);
	matrix.addAntibiotic(antibiotics[1]);
	matrix.addAntibiotic(antibiotics[2]);	

	// Antibiotics
	t.equal(Array.isArray(matrix.antibiotics), true);
	t.equal(matrix.antibiotics.length, 3);
	t.equal(matrix.antibiotics[0].antibiotic, antibiotics[0]);
	t.equal(matrix.getAntibioticView(antibiotics[0]).antibiotic, antibiotics[0]);

	// SubstanceClasses
	t.equal(Array.isArray(matrix.substanceClasses), true);
	t.equal(matrix.substanceClasses.length, 3);
	// Classes are sorted bottom-up, see Antibiotic
	t.equal(matrix.substanceClasses[0].substanceClass, substanceClasses[1]);

	t.end();

});



test('sorts bacteria', (t) => {
	const set = createValidSet();
	const {matrix} = set;
	matrix.addData(set.antibiotics, [set.bacteria[1], set.bacteria[0]]);
	t.equal(matrix.sortedBacteria[0].bacterium.name, 'a');
	t.end();
});

test('returns bacteria', (t) => {
	const set = createValidSet();
	const {matrix, bacteria} = set;
	matrix.addBacterium(bacteria[0]);
	matrix.addBacterium(bacteria[1]);
	t.equal(matrix.sortedBacteria.length, 2);
	t.equal(matrix.getBacteriumView(bacteria[1]).bacterium, bacteria[1]);
	t.end();
});

test('calculates antibiotic label row height when all antibiotic dimensions are set', (t) => {
	const set = createValidSet();
	const {matrix} = set;
	matrix.addData(set.antibiotics, set.bacteria);
	matrix.setAntibioticLabelDimensions(set.antibiotics[0], 50, 20);
	matrix.setAntibioticLabelDimensions(set.antibiotics[1], 50, 60);
	matrix.setAntibioticLabelDimensions(set.antibiotics[2], 50, 40);
	t.equal(matrix.antibioticLabelRowHeight, 60);
	t.end();
});


test('calculates y positions', (t) => {
	const set = createValidSet();
	const {matrix} = set;
	matrix.addData(set.antibiotics, set.bacteria);
	matrix.space = 20;
	matrix.setDimensions({width: 350, height: 100});
	matrix.setBacteriumLabelWidth(set.bacteria[0], 20);
	matrix.setBacteriumLabelWidth(set.bacteria[1], 100);
	matrix.setAntibioticLabelDimensions(set.antibiotics[0], 0, 0);
	matrix.setAntibioticLabelDimensions(set.antibiotics[1], 0, 0);
	matrix.setAntibioticLabelDimensions(set.antibiotics[2], 0, 0);
	t.deepEqual(matrix.yPositions.get(matrix.sortedBacteria[0]), {top: 0});
	t.deepEqual(matrix.yPositions.get(matrix.sortedBacteria[1]), {top: 70});
	t.end();
});

test('calculates bacterium label column width', (t) => {
	const set = createValidSet();
	const {matrix} = set;
	matrix.addData(set.antibiotics, set.bacteria);
	matrix.setDimensions({width: 351.5, height: 200});
	matrix.setBacteriumLabelWidth(set.bacteria[0], 20);
	matrix.setBacteriumLabelWidth(set.bacteria[1], 5);
	matrix.setAntibioticLabelDimensions(set.antibiotics[0], 0, 0);
	matrix.setAntibioticLabelDimensions(set.antibiotics[1], 0, 0);
	matrix.setAntibioticLabelDimensions(set.antibiotics[2], 0, 0);
	t.equal(matrix.bacteriumLabelColumnWidth, 20);
	t.end();
});


test('calculates radius', (t) => {

	const set = createValidSet();
	const {matrix} = set;

	t.equal(matrix.defaultRadius, undefined);
	matrix.addData(set.antibiotics, set.bacteria);
	matrix.setDimensions({width: 401.5, height: 200});
	matrix.space = 20;
	matrix.setBacteriumLabelWidth(set.bacteria[0], 50);
	matrix.setBacteriumLabelWidth(set.bacteria[1], 100);
	matrix.setAntibioticLabelDimensions(set.antibiotics[0], 20, 50);
	matrix.setAntibioticLabelDimensions(set.antibiotics[1], 0, 30);
	matrix.setAntibioticLabelDimensions(set.antibiotics[2], 30, 20);
	t.equal(matrix.defaultRadius, 25);

	// Don't go negative
	matrix.setDimensions({width: 100, height: 100});
	t.equal(matrix.defaultRadius, 1);

	t.end();
});


test('antibiotic functions', (t) => {

	const set = createValidSet();
	set.matrix.addData(set.antibiotics, set.bacteria);

	// sorted
	t.equal(set.matrix.sortedAntibiotics.length, 3);
	set.matrix.sortedAntibiotics.forEach((item) => {
		t.equal(item instanceof AntibioticMatrixView, true);
	});

	// xPos: 1 entry for every ab/sc
	t.equal(set.matrix.xPositions.size, 6);
	// Two entries for antibiotic, one for substanceClass
	t.equal(Array.from(set.matrix.xPositions.keys()).filter((item) => item instanceof AntibioticMatrixView).length, 3);
	t.equal(Array.from(set.matrix.xPositions.keys()).filter((item) => item instanceof SubstanceClassMatrixView).length, 3);

	t.end();

});



test('updates sample size extremes', (t) => {
	const set = createValidSet();
	const {matrix, bacteria, antibiotics, resistances} = set;
	matrix.addData(antibiotics, bacteria, resistances);
	t.deepEqual(matrix.sampleSizeExtremes, { min: 59, max: 100 });
	t.end();
});






