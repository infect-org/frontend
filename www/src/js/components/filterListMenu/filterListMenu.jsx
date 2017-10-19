import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class FilterListMenu extends React.Component {

	_scrollTo(selector) {
		console.error(document.querySelector(selector));
	}

	render() {
		return (
            <div className="group group--vertical group--space-between">
	            <a href="#antibiotics-filters" className="button button--icon icon1"></a>
	            <a href="#bacteria-filters" className="button button--icon icon2"></a>
	            <a href="#population-filters" className="button button--icon icon4"></a>
	        </div>
		);
	}

}
