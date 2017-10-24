import Fetcher from '../../helpers/standardFetcher';
import Bacterium from './bacterium';

export default class BacteriaFetcher extends Fetcher {

	_handleData(data) {
		data.forEach((item) => {
			const bact = new Bacterium(item.id, item.name, {
				aerobic: item.aerobic
				, anaerobic: item.anaerobic
				, gram: item.gram
				, shape: item.shape
			});
			this._store.add(bact);
		});
	}

}