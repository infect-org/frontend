import apiFetch from '../helpers/apiFetch';

/**
* Fetches data from server that is required to display the matrix.
*/
export default async function getInitialData() {

	return Promise.all([
		apiFetch('/bacteria')
		, apiFetch('/compound')
		, apiFetch('/resistance')
	]);

}