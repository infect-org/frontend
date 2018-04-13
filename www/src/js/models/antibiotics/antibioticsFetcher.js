import Fetcher from '../../helpers/standardFetcher';
import Antibiotic from './antibiotic';

export default class AntibioticsFetcher extends Fetcher {

	constructor(...args) {
		super(...args.slice(0, 4));
		this._substanceClasses = args[4];
	}

	_handleData(data) {
		// Cone data as we're modifying it
		data.forEach((item) => {

			// There are 2 special cases: amoxicillin/clavulanate and piperacillin/tazobactam
			// have 2 substances and therefore 2 substance classes; we only respect one. 
			// Why? Because this was not planned and needs a larger re-write. And we're not sure
			// if this is really what doctors want (2 appearances of the same substance in 1 matrix)
			if (item.identifier === 'amoxicillin/clavulanate') {
				item.substance = item.substance.filter((substance) => {
					return substance.identifier === 'amoxicillin';
				});
			} else if (item.identifier === 'piperacillin/tazobactam') {
				item.substance = item.substance.filter((substance) => {
					return substance.identifier === 'piperacillin';
				});
			}

			if (item.substance.length !== 1) console.warn(`antibioticsFetcher: Compound with 
				identifier ${ item.identifier } has more or less than one substance; this is 
				not expected. Only Amoxi & Pip can contain two substances.`);

			// substance hasOne substanceClass – no need to validate data
			if (!item.substance[0].substanceClass) {
				throw new Error(`antibioticsFetcher: Substance 
					${ JSON.stringify(item.substance[0]) } has bad substanceClass data.`);
			}
			const substanceClassId = item.substance[0].substanceClass.id;

			const substanceClass = this._substanceClasses.getById(substanceClassId);
			if (!substanceClass) throw new Error(`AntibioticsFetcher: Substance class with ID 
				${ substanceClassId } not found.`);
			const antibiotic = new Antibiotic(item.id, item.name, substanceClass, {
				iv: item.intravenous,
				po: item.perOs,
				identifier: item.identifier,
			});
			this._store.add(antibiotic);
		});
	}

}