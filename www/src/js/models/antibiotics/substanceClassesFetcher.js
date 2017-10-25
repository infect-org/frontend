import Fetcher from '../../helpers/standardFetcher';
import SubstanceClass from './substanceClass';
import debug from 'debug';
const log = debug('infect:SubstanceClassesFetcher');

export default class SubstanceClassesFetcher extends Fetcher {

	_handleData(originalData) {

		log('Handle data %o', originalData);

		// Clone array to not modify arguments
		const data = originalData.slice(0);
		let addedCount = 0;

		// First create all substanceClasses without parents, then all children, 
		// then all grand-children.
		while(this._store.get().size < originalData.length) {
			let i = data.length;
			while (i--) {
				const item = data[i];

				// Parent is not yet available
				if (item.parent && !this._store.getById(item.parent)) continue;

				// Parent available or has no parent: Create substanceClass
				const additionalProperties = {};
				if (item.color) additionalProperties.color = item.color;
				additionalProperties.order = item.order;

				const parent = item.parent ? this._store.getById(item.parent) : undefined;
				const substanceClass = new SubstanceClass(item.id, item.name, parent, additionalProperties);
				this._store.add(substanceClass);
				addedCount++;

				data.splice(i, 1);
			}
		}

		log('%d substance classes added to store', addedCount);

	}

}