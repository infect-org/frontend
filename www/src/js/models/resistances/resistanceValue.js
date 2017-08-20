import types from './resistanceTypes';

export default class {
	constructor(type, value, sampleSize) {
		if (!types[type]) throw new Error(`ResistanceValue: Type ${type} not known, use one of ${Object.keys(types).join(', ')}.`);
		if (isNaN(parseFloat(value))) throw new Error(`ResistanceValue: Value passed is not a number.`);
		value = parseFloat(value);
		if (value < 0 || value > 1) throw new Error(`ResistanceValue: Value must be between 0 and 1, is ${value}.`);
		if (sampleSize % 1 !== 0) throw new Error(`ResistanceValue: Sample size must be an integer`);
		this.type = types[type];
		this.value = value;
		this.sampleSize = sampleSize;
	}
}