/**
* Needed to calculate radius of resistance dots. Return the relative position of value between
* min and max, but reduce by variation.
* @param {Number} value
* @param {Number} min
* @param {Number} max
* @param {Number} variation		The maximum variation that should be allowed if value = min; if 
*								0.4, the returned value will always be between 0.6 and 1
*/
export default function getRelativeValue(value, min, max, variation = 1) {
	const relativeSize = (value - min) / max;
	if (relativeSize < 0 || relativeSize > 1) {
		throw new Error(`ResistanceComponent: relative sample size must be between 0 and 1, is ${ relativeSize }.`);
	}
	return relativeSize * variation + (1 - variation);
}