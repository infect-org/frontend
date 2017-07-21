import React from 'react';
import {observer} from 'mobx-react';
import Ball from './ball';
import DevTools from 'mobx-react-devtools';

@observer
class Matrix extends React.Component {

	componentDidMount() {
		const rect = this.svg.getBoundingClientRect();
		this.props.store.stage.updateSize(rect.width, rect.height);
	}

	clickHandler = (ev) => {
		this.props.store.resistances.forEach((resistance) => resistance.move());
	}

	render() {
		console.error(this.props);
		return (
			<div>
				<svg ref={(element) => this.svg = element} onClick={this.clickHandler}>
					{this.props.store.resistances.map((item) => <Ball key={item.id} model={item}></Ball>)}
				</svg>
				<DevTools/>
			</div>
		);
	}

}

export default Matrix;