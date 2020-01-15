import { observable, action } from 'mobx';
import debug from 'debug';
const log = debug('infect:GuidedTour');

export default class GuidedTour {

	/**
	* @param {InfoOverlay} infoOverlay			Reference to the info overlay model (overlay must be
	*											closed when guided tour is displayed)
	*/
	constructor(infoOverlay) {
		this.infoOverlay = infoOverlay;
		// Guided tour can be started from infoOverlay. Its content is Markdown – we can only
		// inject JavaScript through its renderer and therein we do not have access to our React
		// models. Therefore we have to dispatch an event – listen to it here and start guided
		// tour when it's fired.
		/* global window */
		window.addEventListener('startGuidedTour', this.start.bind(this));
	}

	@observable started = false;

	@action start() {
		log('Start guided tour, hide infoOverlay');
		this.started = true;
		this.infoOverlay.hide();
	}

	@action end() {
		log('End');
		this.started = false;
	}

}