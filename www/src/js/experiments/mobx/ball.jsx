import {observer} from 'mobx-react';
import React from 'react';

@observer
class Ball extends React.Component {

	render() {
		const style = {transform: 'translate(' + (this.props.model.x) + 'px, ' + (this.props.model.y) + 'px)'};
		return (
			<circle r={this.props.model.radius} fill="red" style={style}></circle>
		);
	}

}

export default Ball;