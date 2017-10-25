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
	            <button className="button button--icon button--antibiotica"></button>
	            <button className="button button--icon button--bacteria"></button>
	            <button className="button button--icon button--population"></button>
	        </div>
		);
	}

}
