import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import debug from 'debug';
const log = debug('infect:FilterListMenuComponent');

@observer
export default class FilterListMenu extends React.Component {

	@observable currentlyActiveSection = 'antibiotics';
	@observable filterSections = ['mostUsed', 'antibiotics', 'bacteria', 'population'];

	componentDidMount() {
		this._scrollElement = document.querySelector('.side-navigation__filters');
		this._setupScrollListener();
	}

	@action updateCurrentlyActiveSection(section) {
		this.currentlyActiveSection = section;
		log('Updated currentlyActiveSection to %s', this.currentlyActiveSection);
	}

	/**
	* - Listen to scroll events on this._scrollElement
	* - Debounce scroll handling
	* - Update currentlyActiveSection with section that's top is above the middle 
	*   of this.scrollElement and closest to it.
	*/
	_setupScrollListener() {
		this._scrollElement.addEventListener('scroll', () => {
			if (this._scrollTimeout) return;
			// Debounce
			this._scrollTimeout = setTimeout(() => {
				this._scrollTimeout = undefined;
				const scrollElementRect = this._scrollElement.getBoundingClientRect();
				// Element becomes active when it scrolls into the top fifth of the scrollElement. 
				// If we use e.g. half, we got two problems: 
				// - when user clicks the bacteria button and scrolls to the corresponding section, 
				//   population filter will be highlighted
				// - Favorites will never be highlighted (because they may consist of just 1 element)
				const scrollElementMiddle = scrollElementRect.top + scrollElementRect.height / 8;
				// Create array of objects with { 
				//	middleDiff: difference between top of element and middle of scrollElement
				//  , section: section (htmlElement)
				//  , sectionName: name of the section
				// }
				// Only go through visibleButtons (mostUsed will therefore not be read from DOM if 
				// it is not displayed. Yay.)
				const tops = this.visibleButtons.map((sectionName) => {
					const section = this._scrollElement.querySelector('#js-filter-list-' + sectionName);
					const middleDiff = scrollElementMiddle - section.getBoundingClientRect().top;
					return { middleDiff, section, sectionName };
				});
				// Get section closest to scrollElementMiddle
				const sorted = tops.filter((item) => item.middleDiff > 0);
				sorted.sort((a, b) => a.middleDiff < b.middleDiff ? -1 : 1);
				this.updateCurrentlyActiveSection(sorted[0].sectionName);
			}, 80);
		});
	}

	_getActiveClass(sectionName) {
		return sectionName === this.currentlyActiveSection
			? `button--${ sectionName }--active`
			: '';
	}

	_buttonClickHandler(section) {
		const target = this._scrollElement.querySelector('#js-filter-list-' + section);
		const top = target.getBoundingClientRect().top + this._scrollElement.scrollTop - this._scrollElement.getBoundingClientRect().top;
		// Try to scroll smoothly
		try {
			this._scrollElement.scroll({
				top: top
				, behavior: 'smooth'
			});
		} catch(err) {
			this._scrollElement.scroll(0, top);
		}
	}

	/**
	* Return buttons that should be displayed to the user. MostUsed is only 
	* visible if filters are available. 
	*/
	@computed get visibleButtons() {
		return this.filterSections.filter((item) => {
			if (item === 'mostUsed' && this.props.mostUsedFilters.mostUsedFilters.length === 0) return false;
			return true;
		});
	}

	render() {
		return (
            <div className="group group--vertical group--left-aligned">
            	{ this.visibleButtons.map((section) => {
		            return <button key={ section }
		            		className={ 'button button--icon button--' + section + ' ' + this._getActiveClass(section) }
		            		onClick={ (ev) => this._buttonClickHandler(section) }>
		            	</button>;
            	})}
	        </div>
		);
	}

}
