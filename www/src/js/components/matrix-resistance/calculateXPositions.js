/**
* Gets coordinates for all elements (antibiotics, substance classes) on x axes. Depends on view
* information (radius etc. that depends on matrix size).
*
* @param {Array} sortedAntibiotics			Array as returned by AntibioticStore.sortedAntibiotics
* @param {Number} radius					Radius of a single resistance
* @param {Number} space						Space between resistances (of an antibiotic)
* @returns {Map} x positions				Map with
*											- keys for every antibiotic and substance class
*											- value x positions for every entry (object with properties
*											  left and right) *or* undefined if substanceClass is not visible
*											  because parent substance class is contracted.
*/
import getArrayDiff from './getArrayDiff';

export default function calculateXPositions(sortedAntibiotics, radius, space, classSpace) {

	// Get all visible antibiotics
	const visibleAB = sortedAntibiotics.filter((ab) => ab.visible);

	// Return value:
	// Key: antibiotic or substanceClass
	// Value: {left: x, right: x}; right is needed for substanceClasses only.
	const xMap = new Map();

	// Get x position
	visibleAB.reduce((prev, current, index) => {


		const substanceClasses = current.getSubstanceClasses();


		// CONTRACTED
		// Contracted substance classes, parent first
		const contractedClasses = substanceClasses.filter((sClass) => !sClass.expanded).reverse();
		// Contracted class is same as in previous loop: Just return
		const unchangedContractedClass = contractedClasses.length && contractedClasses[0] === prev.contractedSubstanceClass;
		prev.contractedSubstanceClass = contractedClasses.length ? contractedClasses[0] : undefined;
		if (unchangedContractedClass) {
			return prev;
		}


		// Get changes in substance classes
		const diff = getArrayDiff(prev.previousSubstanceClasses, current.getSubstanceClasses());
		prev.previousSubstanceClasses = current.getSubstanceClasses();


		// Substance class removed: Add right property
		diff.removed.forEach((sClass) => {
			xMap.get(sClass).right = prev.x;
		});


		// Substance class added
		// Add space before new substanceClass divider. Only one divider is drawn, even if multiple
		// substanceClasses were added.
		if (diff.added.length) prev.x += space;
		diff.added.forEach((sClass) => {
			xMap.set(sClass, {
				left: prev.x
			});
		});


		// Antibiotic
		prev.x += space;
		xMap.set(current, {
			left: prev.x
			, right: prev.x + radius
		});


		// Last round: Add right property to all currently open substanceClasses
		if (index === visibleAB.length - 1) substanceClasses.forEach((sClass) => xMap.get(sClass).right = prev.x + radius);


		prev.x += radius;
		return prev;


	}, {
		// Used to detect changes in classes
		previousSubstanceClasses: []
		// Used to only add 1 radius if classes are contracted. If contracted
		// class changes, we need to add another one. Always take highest ranking
		// contracted substance class (grand parent over parent)
		, contractedSubstanceClass: undefined
		, x: 0
	});

	return xMap;

}