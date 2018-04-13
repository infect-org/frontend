import Fetcher from '../../helpers/standardFetcher';
import SubstanceClass from './substanceClass';
import convertNestedSetToTree from '../../helpers/convertNestedSetToTree';
import debug from 'debug';
const log = debug('infect:SubstanceClassesFetcher');

export default class SubstanceClassesFetcher extends Fetcher {

	_handleData(originalData) {

		log('Handle data %o', originalData);

		// Clone array to not modify arguments
		const data = originalData.slice(0);
		const withParents = convertNestedSetToTree(data);

		// withParents is ordered from parent to child – we therefore don't need to test if 
		// parents are available
		// Don't use forEach as we're splicing.
		withParents.forEach((item, index) => {
			const additionalProperties = {};
			if (item.color) additionalProperties.color = item.color;
			// Sort order corresponds to order of tree created from nested set
			additionalProperties.order = index;

			const parent = item.parent ? this._store.getById(item.parent.id) : undefined;
			const substanceClass = new SubstanceClass(item.id, item.name, parent, 
				additionalProperties);
			this._store.add(substanceClass);
		});

		log('%d substance classes added to store', this._store.get().size);

	}

}