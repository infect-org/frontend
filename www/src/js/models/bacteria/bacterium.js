import {observable} from 'mobx';

class Bacterium {

	@observable visible;

	constructor(name) {
		this.name = name;
	}

}

export default Bacterium;