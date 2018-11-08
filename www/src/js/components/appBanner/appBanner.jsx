import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

@observer
export default class AppBanner extends React.Component {

	@observable displayAppBanner = true;

	constructor() {
		super();
		this._localStoragePropertyName = 'hideAppBanner';
		if (localStorage.getItem(this._localStoragePropertyName)) {
			this.updateVisibility(false);
		}
	}

	@action updateVisibility(visible) {
		this.displayAppBanner = !!visible;
	}

	close() {
		this.updateVisibility(false);
		localStorage.setItem(this._localStoragePropertyName, 1);
	}

	/*startGuidedTour() {
		this.props.guidedTour.start();
	}

	showInfoOverlay() {
		this.props.infoOverlay.show();
	}*/

	render() {
		return (
			<div>
				{ this.displayAppBanner &&
				<div className="main__app-banner app-banner">

						<p className="app-banner__paragraph">

							<span className="app-banner__text">INFECT is now available as an app for your smartphone or tablet:</span>

							<a href="https://itunes.apple.com/us/app/infect/id1422829703?ls=1&mt=8" className="app-banner__link" target="_blank"><img src="/img/app-store-icon.png" alt="Download INFECT on the App Store" className="app-banner__app-store-icon" /></a>
                            <a href="https://play.google.com/store/apps/details?id=info.infect.app" className="app-banner__link" target="_blank"><img src="/img/google-play-icon.png" alt="Get INFECT on Google Play" className="app-banner__app-store-icon" /></a>

							<span className="app-banner__button-container app-banner__button-container--close">
								<button className="app-banner__button button button--close" onClick={ () => this.close() }>&times;</button>
							</span>

						</p>
				</div>
				}
			</div>
		);
	}

}
