import {observable} from 'mobx';

class Bacterium {

	@observable visible;

	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

}

export default Bacterium;