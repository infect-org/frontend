// https://babeljs.io/docs/usage/polyfill/
// Tests throw ReferenceError: regeneratorRuntime is not defined if we don't include the polyfill
import 'babel-polyfill';

/**
* Wrapper for fetch API requests.
* @param {String} url			See fetch function
* @param {Object} options		See fetch function
* @param {Array} validStates	If states outside of [200–299] are valid, you can pass them in;
*								they will be handled regularily.
*/
export default async function apiFetch(url, options, validStates = []) {

	const response = await fetch(url, options);
	if ((response.status < 200 || response.status >= 300) && validStates.indexOf(response.status) === -1) {
		const err = new Error(`apiFetch: API returned invalid HTTP status ${response.status}`);
		err.name = 'HTTPStatusError';
		throw err;
	}
	let data;
	data = await response.json();
	return {
		status: response.status
		, data: data
	};

}