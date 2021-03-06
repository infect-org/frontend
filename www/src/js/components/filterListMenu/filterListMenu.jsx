import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';
import debug from 'debug';
const log = debug('infect:FilterListMenuComponent');

@observer
export default class FilterListMenu extends React.Component {

	@observable filterSections = [
		'mostUsed',
		'guidelines',
		'antibiotics',
		'bacteria',
		'population',
	];
	
	/**
	 * Section that's currently in the screen's center. Don't use mostUsed as it is not available
	 * at startup time (before filters have been used).
	 * @type {String}
	 */
	@observable currentlyActiveSection = this.filterSections[1];

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
				// Element becomes active when it's at the very top. If we change earlier (e.g.
				// when it's at the middle of the screen, the favorites will not be active if they
				// consist of only 1 item).
				// Create array of objects with { 
				//	topDiff: difference between top of element and the top of the scrollElement
				//  , section: section (htmlElement)
				//  , sectionName: name of the section
				// }
				// Only go through visibleButtons (mostUsed will therefore not be read from DOM if 
				// it is not displayed. Yay.)
				const tops = this.visibleButtons.map((sectionName) => {
					const section = this._scrollElement.querySelector('#js-filter-list-' + sectionName);
					const top = scrollElementRect.top;
					const topDiff = (scrollElementRect.top + 20) - section.getBoundingClientRect().top;
					return { topDiff, section, sectionName, top };
				});
				// Get section closest to scrollElementMiddle
				const sorted = tops.filter((item) => item.topDiff > 0);
				sorted.sort((a, b) => a.topDiff < b.topDiff ? -1 : 1);
				// Sorted may be empty if we have an elasticly scrolling browser – it's the topmost
				// section that's active.
				if (!sorted.length) sorted[0] = tops.sort((a, b) => a.top < b.top ? 1 : -1)[0];
				this.updateCurrentlyActiveSection(sorted[0].sectionName);
			}, 80);
		});
	}

	_getActiveClass(sectionName) {
		return sectionName === this.currentlyActiveSection
			? `button--icon--active`
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
			// IE11 & friends
			this._scrollElement.scrollTop = top;
		}
	}

	_getNiceName(name) {
		return name.replace(/^\[a-z]/, (result) => result.toUpperCase()).replace(/[A-Z]/g, (result) => ' ' + result.toLowerCase());
	}


	/**
	* Return buttons that should be displayed to the user. MostUsed is only 
	* visible if filters are available. 
	*/
	@computed get visibleButtons() {
		const visibleButtons = this.filterSections.filter((item) => {
			if (item === 'mostUsed' && this.props.mostUsedFilters.mostUsedFilters.length === 0) {
				return false;
			}
			// Only display guidelines if they are available on the current tenant
			if (item === 'guidelines' && this.props.guidelines.getAsArray().length === 0) {
				return false;
			}
			return true;
		});
		log('Visible buttons are %o', visibleButtons);
		return visibleButtons;
	}

	render() {
		return (
            <div className="group group--vertical group--left-aligned js-filter-list-menu">
				{ this.visibleButtons.map((section) => {
					return <button key={ section }
							title={ this._getNiceName(section) }
							className={ 'button button--icon button--icon--' + section + ' ' + this._getActiveClass(section) }
							onClick={ () => this._buttonClickHandler(section) }>
						<svg aria-hidden="true"><use xlinkHref={'#icon_' + section }/></svg>
						</button>;
				})}
			</div>
		);
	}

}
