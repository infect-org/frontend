export default function searchString(value, searchTerm) {

	if (typeof value !== 'string') throw new Error('searchString: Type of value must be a string');
	if (typeof searchTerm !== 'string') throw new Error('searchString: Type of searchTerm must be a string');

	if (!searchTerm) return true;
	return clearString(value).indexOf(clearString(searchTerm)) > -1;
}

function clearString(string) {
	return string.toLowerCase().replace(/[^0-9a-z]/g, '');
}