import React from 'react';
import { observer } from 'mobx-react';
import debug from 'debug';
const log = debug('infect:GuidedTourButtonComponent');

@observer
export default class GuidedTourButton extends React.Component {

	startGuidedTour() {
		log('Start');
		this.props.guidedTour.start();
	}

	stopGuidedTour() {
		log('Stop');
		this.props.guidedTour.end();
	}

	render() {
		return (
			<span>
				{ !this.props.guidedTour.started && 
					<button onClick={ () => this.startGuidedTour() }>Start guided tour</button>
				}
				{ this.props.guidedTour.started && 
					<button onClick={ () => this.stopGuidedTour() }>Hide guided tour</button>
				}
			</span>
		);
	}

}
