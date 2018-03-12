import React from 'react';
import { introJs } from 'intro.js';
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
				this.introJs.showHints();
			}
			else {
				// autorun will be run on init where guidedTour.started will be false;
				// this.introJs will not be available at this moment.
				if (this.introJs) this.introJs.hideHints();
			}
		});
	}

	/**
	* Creates and starts the guided tour/hints
	*/
	setupGuidedTour() {
		log(introJs);
		this.introJs = introJs();
		this.introJs.setOptions({
			hintButtonLabel: '&times;',
			hintPosition: 'top-left',
			hints: [{
				element: document.querySelector('.js-filter-search-input'),
				hint: `Quickly find any filter values. Enter «Amox» to quickly filter by 
					Amoxicillin or «East» to display data for the East region. Your input must
					not be precise, as we use a forgiving search algorithm.`,
			}, {
				element: document.querySelector('.js-filter-list-menu'),
				hint: `Use the filter navigation to quickly jump to a filter section:
					<ol class="list">
						<li><b>Favorites</b>: Your most used filters for the current session (is only
							displayed after you add the first filter)</li>
						<li><b>Antibiotic</b>: Filter antibiotics by their characteristics</li>
						<li><b>Bacteria</b>: Filter bacteria by their characteristics</li>
						<li><b>Offset and Population</b>: Add offsets to the data displayed or limit 
							it to a certain region</li>
					</ol>
				`,
			}, {
				element: document.querySelector('.js-filter-search-container'),
				hint: `Use the dark filter area on the left to change the data displayed in 
					the matrix. If you add filters for antibiotics, 
					substances or bacteria, rows or columns will be hidden. If you add population 
					or offset filters, the contents of the matrix will change.`,
				hintPosition: 'top-right',
			}, {
				element: document.querySelector('.js-substance-class:last-child'),
				hint: `Substances are grouped by substance classes. Click on a substance class to 
					add or remove the corresponding filter to the matrix.`,
			}, {
				element: document.querySelector('.js-resistance'),
				hint: `At the intersection between antibiotic substances (columns) and bacteria 
					(rows), you can read the susceptibility of a substance 
					against a bacterium. 
					<img class="image--fullwidth" src="dist/img/step1.svg"/>
					<img class="image--fullwidth" src="dist/img/step2.svg"/>
					When you hover or touch a circle, you’ll see the susceptibility’s details:
					<img class="image--fullwidth" src="dist/img/step3.svg"/>
				`,
			}]
		});
		this.introJs.addHints();
	}

	render() {
		return null;
	}

}