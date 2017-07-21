import {observable} from 'mobx';

class Resistance {

	constructor(resistance, sampleSize) {
		this.resistance = resistance;
		this.sampleSize = sampleSize;
	}

}

export default Resistance;