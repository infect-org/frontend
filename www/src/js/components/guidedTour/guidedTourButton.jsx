import React from 'react';
import { observer } from 'mobx-react';
import debug from 'debug';
const log = debug('infect:GuidedTourButtonComponent');

@observer
export default class GuidedTourButton extends React.Component {

	startGuidedTour() {
		log('Start; guided Tour is %o', this.props.guidedTour);
		this.props.guidedTour.start();
	}

	render() {
		return (
			<span>
				<button onClick={ () => this.startGuidedTour() } className="button button--guide">Start guided tour</button>
			</span>
		);
	}

}
