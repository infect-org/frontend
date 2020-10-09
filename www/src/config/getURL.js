import urlConfig from './urlConfig.js';

/**
 * Returns the URL for a given scope (e.g. "tenant") and endpoint (e.g. "config")
 * @param {string} scope
 * @param {string} endpoint
 * @return {string}             URL for given scope/endpoint
 */
export default function getURL(scope, endpoint) {


    // TODO: VET2020
    // Also remove mock api endpoint?
    if (scope === 'coreData' && endpoint === 'sampleSource') {
        const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/mockApi/sampleSource.json`;
        return url;
    }

    let baseURL = window.location.host;

    // Let users chose tenant (only on dev environment). To do so, add e.g. ?host=vet.infect.info
    // to the URL
    if (window.location.hostname === 'localhost') {
        const customHost = /(\?|&)host=([^&]*)/.exec(window.location.search)
        if (customHost) {
            baseURL = customHost[2];
        }
    }

    const apiURL = `api.${baseURL}`;

    const scopeData = urlConfig.endpoints[scope];
    if (!scopeData) {
        throw new Error(`getURL: Scope ${scope} is not known. Provide any of ${Object.keys(urlConfig.endpoints).join(', ')}.`);
    }

    if (!scopeData.paths[endpoint]) {
        throw new Error(`getURL: Endpoint ${endpoint} is not known. Provide any of ${Object.keys(scopeData.paths).join(', ')} for scope ${scope}.`);
    }

    // Add filters for preview etc.
    let filter = '';
    
    // If URL's query params include ?preview or &preview, also load guideline data that has not yet
    // ben published. See https://github.com/infect-org/issues/issues/47.
    if (scope === 'guideline' && /(\?|&)preview/.test(window.location.search)) {
        filter = '?showAllData=true';
    }
    
    return `https://${apiURL}/${scopeData.prefix}/${scopeData.paths[endpoint]}${filter}`;

}


