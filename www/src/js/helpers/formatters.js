/**
* Adds thousands separator to a number; 50000 produces "50'000". Does not 
* work with floats.
* @param {String|Integer} 		number to format
* @returns {String}
*/
function numberWithThousandsSeparators(number) {
	return (number + '').split('').reverse().map((item, index) => {
		return index % 3 === 0 && index > 0 ? item + '\'' : item;
	}).reverse().join('');
}

export { numberWithThousandsSeparators };