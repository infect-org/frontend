import React from 'react';
import introJs from 'intro.js';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import debug from 'debug';
const log = debug('infect:GuidedTourComponent');

@observer
export default class GuidedTour extends React.Component {

	componentDidMount() {
		// Switch from declarative to imperative by watching guidedTour.started
		autorun(() => {
			log('Change in guided tour to %o', this.props.guidedTour.started);
			if (this.props.guidedTour.started) {
				log('Started');
				if (!this.introJs) this.setupGuidedTour();
				this.introJs.start();
			}
			else {
				// autorun will be run on init where guidedTour.started will be false;
				// this.introJs will not be available at this moment.
				if (this.introJs) this.introJs.exit();
			}
		});
	}

	/**
	* Creates and starts the guided tour/hints
	*/
	setupGuidedTour() {
		const resistanceElement = 
			document.querySelector('.js-resistance:not(.-was-visible-is-hidden)');
		this.introJs = introJs();
		this.introJs.setOptions({
			//hintButtonLabel: '&times;',
			//hintPosition: 'middle-left',
			tooltipPosition: 'auto',
			steps: [
				// Resistance 1
				{
					element: resistanceElement,
					intro: `At the intersection between antibiotic substances (columns) and bacteria 
						(rows), you can read the susceptibility of a substance 
						against a bacterium. 
						<div class="tour-image-wrapper tour-image-wrapper--step1">
							<img class="image image--fluid" src="dist/img/step1.svg"/>
						</div>
					`,
				},
				// Resistance 2
				{
					element: resistanceElement,
					intro: `
						The susceptibility is gradually colored from a pale red (low susceptibility) 
						to an intense green (high susceptibility).
						<div class="tour-image-wrapper tour-image-wrapper--step2">
							<img class="image image--fluid" src="dist/img/step2.svg"/>
						</div>
					`,
				},
				// Resistance 3
				{
					element: resistanceElement,
					intro: `If you move your mouse cursor over a susceptibility circle (or tap it on  
					your mobile phone), the additional details are displayed:
						<div class="tour-image-wrapper tour-image-wrapper--step3">
							<img class="image image--fluid" src="dist/img/step3.svg"/>
						</div>
					`,
				},
				// Substance class
				{
					element: document.querySelector('.js-substance-class:last-child'),
					intro: `Substances are grouped by substance classes. Click on a substance class 
						to add or remove the corresponding filter to the matrix.
						<div class="tour-image-wrapper tour-image-wrapper--small-devices-only tour-image-wrapper--substance-classes">
							<img class="image image--fluid" src="dist/img/substance-classes.jpg"/>
						</div>
						`,
				},
				// Filter bar (dark, left)
				{
					element: document.querySelector('.js-side-navigation'),
					intro: `Use the dark filter area on the left to change the data displayed in 
						the matrix. If you add filters for antibiotics, 
						substances or bacteria, rows or columns will be hidden. If you add  
						population or offset filters, the contents of the matrix will change.
						<div class="tour-image-wrapper tour-image-wrapper--small-devices-only tour-image-wrapper--filters">
							<img class="image image--fluid" src="dist/img/filters.jpg"/>
						</div>
						`,
					//hintPosition: 'top-right',
				}, 
				// Filter search
				{
					element: document.querySelector('.js-filter-search-input'),
					intro: `Quickly find any filter values. Enter «Amox» to quickly filter by 
						Amoxicillin or «East» to display data for the East region. Your input must
						not be precise, as we use a forgiving search algorithm.
						<div class="tour-image-wrapper tour-image-wrapper--small-devices-only tour-image-wrapper--search-filters">
							<img class="image image--fluid" src="dist/img/search-filters.jpg"/>
						</div>
						`,
				}, 
				// Filter navigation
				{
					element: document.querySelector('.js-filter-list-menu'),
					intro: `Use the filter navigation to quickly jump to a filter section:
						<ol class="list">
							<li><b>Favorites</b>: Your most used filters for the current session (is 
								only displayed after you add the first filter)</li>
							<li><b>Antibiotic</b>: Filter antibiotics by their characteristics</li>
							<li><b>Bacteria</b>: Filter bacteria by their characteristics</li>
							<li><b>Offset and Population</b>: Add offsets to the data displayed or 
								limit it to a certain region</li>
						</ol>
						<div class="tour-image-wrapper tour-image-wrapper--small-devices-only tour-image-wrapper--filter-list-menu">
							<img class="image image--fluid" src="dist/img/filter-list-menu.jpg"/>
						</div>
					`,
				}, 
			]
		});
		// Make sure we reset guidedTour.started to false as soon as guided tour ends
		this.introJs.onexit(() => this.props.guidedTour.end());
		this.introJs.oncomplete(() => this.props.guidedTour.end());
	}

	render() {
		return null;
	}

}