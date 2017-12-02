import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import debug from 'debug';
import generateFilterList from './generateFilterList';
import FilterListCheckbox from '../filterListCheckbox/filterListCheckbox';
const log = debug('infect:MostUsedFiltersListComponent');

@observer
class MostUsedFiltersList extends React.Component {

	constructor() {
		super();
		// Changing filters should not change the filters currently in viewport: 
		// Scroll by the difference of most used filter's height.
		this._previousHeight = 0;
	}

	componentWillMount() {
		this._scrollElement = document.querySelector('.side-navigation__filters');
		this._setScrollPositionBeforeChange();
	}

	componentDidMount() {
		this._filterElement = document.querySelector('#js-filter-list-mostUsed');
		setTimeout(() => {
			log('componentDidMount');
			//this._setScrollPositionBeforeChange();
			this._updateScrollPosition();
		});
	}

	componentWillUpdate() {
		this._setScrollPositionBeforeChange();
	}

	componentDidUpdate() {
		this._updateScrollPosition();
	}

	_handleFilterChange = (item) => {
		log('Handle filter change for item %o', item);
		this.props.selectedFilters.toggleFilter(item);
	}

	@computed get mostUsedFilters() {
		return this.props.mostUsedFilters.mostUsedFilters
			.sort((a, b) => a.count > b.count ? -1 : 1)
			.slice(0, 10);
	}


	/**
	* Wow: 
	* - In Chrome, the browser scrolls by the height difference that adding an element creates – but only
	*   if it is not the first addition. 
	* - Safari never scrolls. 
	* We therefore detect where the scroll position was, before the component changed; after it was changed,
	* we compare the scroll position. If it did not change, we scroll manually (see _updateScrollPosition); 
	* if it changed, we do nothing (because the browser probably handled it).
	*/
	_setScrollPositionBeforeChange() {
		this._scrollPositionBeforeUpdate = this._scrollElement.scrollTop;
		log('Set _scrollPositionBeforeUpdate to %d', this._scrollPositionBeforeUpdate);
	}

	/**
	* When component is mounted or updated, compare its height to the previous height
	* and scroll accordingly so that currently viewable are of filters does not change.mostUsedFilters
	* Chrome does only require the scroll adjustment when component is mounted, Safari
	* whenever it changes.
	*/
	_updateScrollPosition() {
		let height = this._filterElement.getBoundingClientRect().height;
		// 41: Height of margin-top of element, margin-top of following divider and
		// line height. Needs a re-styling to improve. 
		// See https://github.com/infect-org/frontend/issues/51
		height += 41;
		const diff = height - this._previousHeight;
		log('New height of mostUsed is %d, diff to previous height %d', height, diff);
		const scrollTop = this._scrollElement.scrollTop;
		const newScrollTop = diff + scrollTop;
		// Only scroll if the browser didn't on its own (as Chrome does – sometimes)
		log('Current scrollTop is %d, new %d', scrollTop, this._scrollPositionBeforeUpdate);
		if (scrollTop === this._scrollPositionBeforeUpdate) {
			this._scrollElement.scrollTop = newScrollTop;
		}
		this._previousHeight = height;
	}

	render() {
		return (
			<ul className="group__list group__list--vertical">
				{ this.mostUsedFilters.map((used) => {
					return <FilterListCheckbox key={ used.filter.value + used.filter.property.name } name={ used.filter.niceValue } 
						value={ used.filter.niceValue } checked={ this.props.selectedFilters.isSelected(used.filter) }
						onChangeHandler={ () => this._handleFilterChange(used.filter) } />;
				}) }
			</ul>
		);
	}
}

export default generateFilterList(MostUsedFiltersList);