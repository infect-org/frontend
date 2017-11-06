import Fetcher from '../../helpers/standardFetcher';
import Antibiotic from './antibiotic';

export default class AntibioticsFetcher extends Fetcher {

	constructor(...args) {
		super(...args.slice(0, 3));
		this._substanceClasses = args[3];
	}

	_handleData(data) {
		data.forEach((item) => {
			const substanceClass = this._substanceClasses.getById(item.substanceClasses[0].id);
			if (!substanceClass) throw new Error(`AntibioticsFetcher: Substance class with ID ${ item.substanceClasses[0].id } not found.`);
			const antibiotic = new Antibiotic(item.id, item.name, substanceClass, {
				iv: item.iv
				, po: item.po
				, identifier: item.identifier
			});
			this._store.add(antibiotic);
		});
	}

}