import React from 'react';
import AntibioticLabel from '../matrix-antibiotic/antibioticLabel';
import BacteriumLabel from '../matrix-bacterium/bacteriumLabel';
import Resistance from '../matrix-resistance/resistance';
import {observer} from 'mobx-react';
//import DevTools from 'mobx-react-devtools';

@observer
export default class Matrix extends React.Component {

	render() {
		return(
			<svg ref={(el) => this.props.matrix.setDimensions(el && el.getBoundingClientRect())}>

				{this.props.matrix.sortedAntibiotics.map((ab) => 
					<AntibioticLabel key={ab.antibiotic.id} antibiotic={ab} />
				)}

				{this.props.matrix.sortedBacteria.map((bact) => 
					<BacteriumLabel key={bact.bacterium.id} bacterium={bact} />
				)}

				{this.props.matrix.radius !== 0 && <Resistance matrix={this.props.matrix} resistance={{value: 30}}/>}

			</svg>
		);
	}

}
