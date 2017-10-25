import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class FilterListMenu extends React.Component {

	_scrollTo(selector) {
		console.error(document.querySelector(selector));
	}

	render() {
		return (
            <div className="group group--vertical group--left-aligned">
	            <a href="#antibiotics-filters" className="button button--icon button--antibiotica"></a>
	            <a href="#bacteria-filters" className="button button--icon button--bacteria"></a>
	            <a href="#population-filters" className="button button--icon button--population"></a>
	        </div>
		);
	}

}
