import React from 'react';
import {observer} from 'mobx';

export default class AntibioticLabel extends React.Component {

	/**
	* Set height of view on model; needed as height is variable (because uf the 45° angle)
	* and space available for the matrix is calculated depending on the space that the highest 
	* label takes up.
	*/
	setHeight(height) {
		this.props.antibiotic.setHeight(height);
	}

	render() {
		return (
			<text ref={(el) => this.setHeight(el && el.getBBox().height)}>{this.props.antibiotic.antibiotic.name}</text>
		);
	}

}