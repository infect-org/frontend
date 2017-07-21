import {observable, computed} from 'mobx';

class AnitibioticStore {

	constructor() {
		this.antibiotics = [];
	}

	addAntibiotic(antibiotic) {
		this.antibiotics.push(antibiotic);
	}

	getAntibioticById(id) {
		return this.antibiotics.find((item) => item.id === id);
	}


	/**
	* Returns sorted antibiotics; sort order:
	* - sort alphabetically by substanceClass; from highest (parent) to lowest;
	*   antibiotics without substance classes come first
	* - then sort antibiotics alphabetically within the lowest (child) class.
	*
	* Function is needed to calculate horizontal position of a an antibiotic and a
	* resistance in the matrix.
	*/
	@computed get sortedAntibiotics() {
	
		// Map with key: antibiotic, value: Array of parent class names		
		const classMap = this.antibiotics.reduce((previous, item) => {
			// Store substanceClasse's names, parent to child
			previous.set(item, item.getSubstanceClasses().reverse().map((sClass => sClass.name)));
			return previous;
		}, new Map());

		const sorted = this.antibiotics.sort((a, b) => {
			// Go through hierarchies of substanceClasses
			const minClassAmount = Math.min(classMap.get(a).length, classMap.get(b).length);
			let currentHierarchy = 0;
			while (currentHierarchy < minClassAmount) {
				// Different substance class: Sort alphabetically
				if (classMap.get(a)[currentHierarchy] < classMap.get(b)[currentHierarchy]) return -1;
				else if (classMap.get(a)[currentHierarchy] > classMap.get(b)[currentHierarchy]) return 1;
				// -> SubstanceClass is the same
				// There are more hierarchy levels: Go one up
				else if (currentHierarchy < minClassAmount - 1) currentHierarchy++;
				// -> All hierarchies used
				// Prefer the antibiotic with fewer class hierarchies
				else if (classMap.get(a).length != classMap.get(b).length) return classMap.get(a).length < classMap.get(b).length ? -1 : 1;
				// All the same: Sort by ab name
				else return a.name < b.name ? -1 : 1;
			}
		});

		return sorted;

	}



}

export default AnitibioticStore;