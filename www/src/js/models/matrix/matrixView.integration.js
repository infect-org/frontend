import test from 'tape';
import MatrixView from './matrixView';
import Antibiotic from '../antibiotics/antibiotic';
import AntibioticMatrixView from '../antibiotics/antibioticMatrixView';
import SubstanceClassMatrixView from '../antibiotics/substanceClassMatrixView';
import SubstanceClass from '../antibiotics/substanceClass';


function createSubstanceClass(name = 'testSC', id = Math.random()) {
	return new SubstanceClass(id, name);	
}

function ceateAntibiotic(substanceClass, name = 'testAB', id = Math.random()) {
	return new Antibiotic(id, name, substanceClass);
}

function createValidSet() {
	const sc = createSubstanceClass();
	const ab1 = ceateAntibiotic(sc);
	const ab2 = ceateAntibiotic(sc);
	const matrix = new MatrixView();
	matrix.addAntibiotic(ab1);
	matrix.addAntibiotic(ab2);
	return {
		matrix: matrix
		, ab1: ab1
		, ab2: ab2
		, sc: sc
	};
}


test('adds all data through addData', (t) => {
	const set = createValidSet();
	const matrix = new MatrixView();
	matrix.addData([set.ab1, set.ab2]);
	t.equals(matrix.antibiotics.length, 2);
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

	const {sc, ab1, ab2, matrix} = createValidSet();

	// Antibiotics
	t.equal(Array.isArray(matrix.antibiotics), true);
	t.equal(matrix.antibiotics.length, 2);
	t.equal(matrix.antibiotics[0].antibiotic, ab1);
	t.equal(matrix.antibiotics[1].antibiotic, ab2);

	// SubstanceClasses
	t.equal(Array.isArray(matrix.substanceClasses), true);
	t.equal(matrix.substanceClasses.length, 1);
	t.equal(matrix.substanceClasses[0].substanceClass, sc);

	t.end();

});


test('antibiotic functions', (t) => {

	const {sc, ab1, ab2, matrix} = createValidSet();

	// sorted
	t.equal(matrix.sortedAntibiotics.length, 2);
	matrix.sortedAntibiotics.forEach((item) => {
		t.equal(item instanceof AntibioticMatrixView, true);
	});

	// xPos
	t.equal(matrix.xPositions.size, 3);
	// Two entries for antibiotic, one for substanceClass
	t.equal(Array.from(matrix.xPositions.keys()).filter((item) => item instanceof AntibioticMatrixView).length, 2);
	t.equal(Array.from(matrix.xPositions.keys()).filter((item) => item instanceof SubstanceClassMatrixView).length, 1);

	t.end();

});



