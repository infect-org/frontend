import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import GuidedTourButton from '../guidedTour/guidedTourButton';

@observer
export default class Disclaimer extends React.Component {

	@observable displayDisclaimer = true;

	constructor() {
		super();
		this._localStoragePropertyName = 'hideDisclaimer';
		if (localStorage.getItem(this._localStoragePropertyName)) {
			this.updateVisibility(false);
		}
	}

	@action updateVisibility(visible) {
		this.displayDisclaimer = !!visible;
	}

	close() {
		this.updateVisibility(false);
		localStorage.setItem(this._localStoragePropertyName, 1);
	}

	startGuidedTour() {
		this.props.guidedTour.start();
	}

	showInfoOverlay() {
		this.props.infoOverlay.show();
	}

	render() {
		// See https://github.com/infect-org/frontend/issues/64
		return (
			<div>
				{ this.displayDisclaimer && 
				<div className="main__disclaimer disclaimer">
					
						<p className="disclaimer__paragraph">
							<span className="disclaimer__text">By using INFECT, you accept 
								our <a href="#disclaimer" onClick={ () => this.showInfoOverlay() }
								className="disclaimer__link disclaimer__link--disclaimer">disclaimer</a>.
								See some <a href="#" onClick={ () => this.showInfoOverlay() }
								className="disclaimer__link">background information</a>.
								If you have any questions, <a href="mailto:info@infect.info"
								className="disclaimer__link">contact us</a>. <span className="disclaimer__text--guide-info">Or just get a short
									introduction:</span>
							</span>
							<span className="disclaimer__button-container disclaimer__button-container--guide">
								<GuidedTourButton guidedTour={ this.props.guidedTour }>
								</GuidedTourButton>
							</span>
							<span className="disclaimer__button-container disclaimer__button-container--close">
								<button className="disclaimer__button button button--close" onClick={ () => this.close() }>&times;</button>
							</span>
						</p>	
				</div>
				}
			</div>
		);
	}

}