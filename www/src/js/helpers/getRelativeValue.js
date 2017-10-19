/**
* Needed to calculate radius of resistance dots. Return the relative position of value between
* min and max, but reduce by variation. If min = 200, max = 1000, value = 500, the relative 
* value would be .375. If variation .4 is added, all values must lie between 0.6 and 1;
* the relative value therefore becomes .75.
* @param {Number} value
* @param {Number} min
* @param {Number} max
* @param {Number} variation		The maximum variation that should be allowed if value = min; if 
*								0.4, the returned value will always be between 0.6 and 1
*/
export default function getRelativeValue(value, min, max, variation = 1) {
	const relativeSize = (value - min) / (max - min);
	if (relativeSize < 0 || relativeSize > 1) {
		throw new Error(`ResistanceComponent: relative sample size must be between 0 and 1, is ${ relativeSize }.`);
	}
	return relativeSize * variation + (1 - variation);
}