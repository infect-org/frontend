import {observable, action, computed} from 'mobx';

class Resistance {
	@observable sampleSize = Math.round(Math.random() * 500);
	@observable resistance = Math.random();
	@observable _id;
	@observable x = 50;
	@observable y = 50;
	@observable radius = 10;

	constructor(id, stage) {
		this._id = id;
		this._stage = stage;
	}

	@action move() {
		this.x = Math.random() * this._stage.width;
		this.y = Math.random() * this._stage.height;
		this.radius = Math.random() * 20;
		//console.log('Resistance: Moved %d to %d/%d', this._id, this.x, this.y);
	}

	get id() {
		return this._id;
	}

	@computed set id(id) {
		throw new Error('nope');
	}

}

export default Resistance;