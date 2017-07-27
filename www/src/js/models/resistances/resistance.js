import {observable} from 'mobx';

export default class Resistance {

	// #todo: Value, type, ab/bact
	constructor(value, type, sampleSize, antibiotic, bacterium) {
		this.resistance = value;
		this.antibiotic = antibiotic;
		this.bacterium = bacterium;
		this.sampleSize = sampleSize;
		this.type = type;
	}

}