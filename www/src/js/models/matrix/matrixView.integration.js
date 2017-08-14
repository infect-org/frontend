import test from 'tape';
import MatrixView from './matrixView';
import Antibiotic from '../antibiotics/antibiotic';
import AntibioticMatrixView from '../antibiotics/antibioticMatrixView';
import SubstanceClassMatrixView from '../antibiotics/substanceClassMatrixView';
import SubstanceClass from '../antibiotics/substanceClass';
import Bacterium from '../bacteria/bacterium';

function createSubstanceClass(name = 'testSC', id = Math.random(), parent) {
	return new SubstanceClass(id, name, parent);
}

function ceateAntibiotic(substanceClass, name = 'testAB', id = Math.random()) {
	return new Antibiotic(id, name, substanceClass);
}

function createBacterium(name = 'testBact', id = Math.random()) {
	return new Bacterium(id, name);
}

function createValidSet() {
	const sc1 = createSubstanceClass();
	const sc2 = createSubstanceClass(sc1);
	const sc3 = createSubstanceClass();
	const ab1 = ceateAntibiotic(sc2);
	const ab2 = ceateAntibiotic(sc2);
	const ab3 = ceateAntibiotic(sc3);
	const bact1 = createBacterium('a');
	const bact2 = createBacterium('b');
	const matrix = new MatrixView();
	return {
		matrix: matrix
		, antibiotics: [ab1, ab2, ab3]
		, bacteria: [bact1, bact2]
		, substanceClasses: [sc1, sc2, sc3]
	};
}





test('addData', (t) => {
	const set = createValidSet();
	set.matrix.addData(set.antibiotics, set.bacteria);
	t.equal(set.matrix.antibiotics.length, 3);
	t.equal(set.matrix.sortedBacteria.length, 2);
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
	const ab1 = set.antibiotics[0];
	const ab2 = set.antibiotics[1];
	const matrix = set.matrix;

	// Antibiotics
	t.equal(Array.isArray(matrix.antibiotics), true);
	t.equal(matrix.antibiotics.length, 2);
	t.equal(matrix.antibiotics[0].antibiotic, ab1);
	t.equal(matrix.antibiotics[1].antibiotic, ab2);

	// SubstanceClasses
	t.equal(Array.isArray(matrix.substanceClasses), true);
	t.equal(matrix.substanceClasses.length, 1);
	t.equal(matrix.substanceClasses[0].substanceClass, set.substanceClasses[0]);

	t.end();

});


test('sorts bacteria', (t) => {
	const set = createValidSet();
	const matrix = new MatrixView();
	matrix.addData(set.antibiotics, [set.bacteria[1], set.bacteria[0]]);
	t.equal(matrix.sortedBacteria[0].bacterium.name, 'a');
	t.end();
});


test('calculates radius', (t) => {
	t.end();
});


test('antibiotic functions', (t) => {

	const set = createValidSet();
	set.matrix.addData(set.antibiotics, set.bacteria);

	// sorted
	t.equal(set.matrix.sortedAntibiotics.length, 2);
	set.matrix.sortedAntibiotics.forEach((item) => {
		t.equal(item instanceof AntibioticMatrixView, true);
	});

	// xPos
	t.equal(set.matrix.xPositions.size, 3);
	// Two entries for antibiotic, one for substanceClass
	t.equal(Array.from(set.matrix.xPositions.keys()).filter((item) => item instanceof AntibioticMatrixView).length, 2);
	t.equal(Array.from(set.matrix.xPositions.keys()).filter((item) => item instanceof SubstanceClassMatrixView).length, 1);

	t.end();

});



