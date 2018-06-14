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
						<img class="image--fullwidth" src="dist/img/step1.svg"/>
					`,
				},
				// Resistance 2
				{
					element: resistanceElement,
					intro: `
						<img class="image--fullwidth" src="dist/img/step2.svg"/>
					`,
				},
				// Resistance 3
				{
					element: resistanceElement,
					intro: `
						<img class="image--fullwidth" src="dist/img/step3.svg"/>
					`,
				},
				// Substance class
				{
					element: document.querySelector('.js-substance-class:last-child'),
					intro: `Substances are grouped by substance classes. Click on a substance class 
						to add or remove the corresponding filter to the matrix.`,
				},
				// Filter bar (dark, left)
				{
					element: document.querySelector('.js-side-navigation'),
					intro: `Use the dark filter area on the left to change the data displayed in 
						the matrix. If you add filters for antibiotics, 
						substances or bacteria, rows or columns will be hidden. If you add  
						population or offset filters, the contents of the matrix will change.`,
					//hintPosition: 'top-right',
				}, 
				// Filter search
				{
					element: document.querySelector('.js-filter-search-input'),
					intro: `Quickly find any filter values. Enter «Amox» to quickly filter by 
						Amoxicillin or «East» to display data for the East region. Your input must
						not be precise, as we use a forgiving search algorithm.`,
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