import React from 'react';
import AntibioticLabel from '../matrix-antibiotic/antibioticLabel';
import Resistance from '../matrix-resistance/resistance';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@observer
export default class Matrix extends React.Component {

	render() {
		return(
			<svg ref={(el) => this.props.matrix.setDimensions(el && el.getBoundingClientRect())}>

				{this.props.matrix.antibiotics.map((ab) => 
					<AntibioticLabel key={ab.antibiotic.id} antibiotic={ab} />
				)}

				{this.props.matrix.radius !== 0 && <Resistance matrix={this.props.matrix} resistance={{value: 30}}/>}

			</svg>
		);
	}

}
