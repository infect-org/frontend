import React from 'react';
import {observer} from 'mobx-react';

@observer
export default class BacteriumLabel extends React.Component {

	render() {
		return (
			<text x="100" y="50" ref={(el) => this.props.bacterium.setDimensions(el.getBBox())}>{this.props.bacterium.bacterium.name}</text>
		);
	}

}