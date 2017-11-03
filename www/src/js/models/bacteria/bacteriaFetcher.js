import Fetcher from '../../helpers/standardFetcher';
import Bacterium from './bacterium';

export default class BacteriaFetcher extends Fetcher {

	_handleData(data) {
		data.forEach((item) => {
			const bact = new Bacterium(item.id, item.name, {
				// Use two properties for aerobic/anaerobic, as selecting both 
				// should only display values that validate for *both* properties:
				// https://github.com/infect-org/frontend/issues/71
				aerobic: item.aerobic || item.aerobicOptional
				, anaerobic: item.anaerobic || item.anaerobicOptional
				, gram: item.gram
				, shape: item.shape
			});
			this._store.add(bact);
		});
	}

}