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

		this.close = this.close.bind(this);
	}

	@action updateVisibility(visible) {
		this.displayAppBanner = !!visible;
	}

	close() {
		this.updateVisibility(false);
		localStorage.setItem(this._localStoragePropertyName, 1);
	}

	get urls() {
		const frontend = this.props.tenantConfig.getConfig('frontend');
		return frontend && frontend.appStoreURLs || {};
	}

	render() {
		return (
			<div>
				{ this.displayAppBanner && (this.urls.iOS || this.urls.playStore) &&
				<div className="main__app-banner app-banner">

						<p className="app-banner__paragraph">

							<span className="app-banner__text">INFECT is available as an app for your smartphone and tablet:</span>

							<a
								href={this.urls.iOS}
								className="app-banner__link"
								target="_blank"
							>
								<img
									src="img/apps/app-store-icon.png"
									alt="Download INFECT on the App Store"
									className="app-banner__app-store-icon"
								/>
							</a>
                            <a
                            	href={this.urls.playStore}
                            	className="app-banner__link"
                            	target="_blank"
                            >
                            	<img
                            		src="img/apps/google-play-icon.png"
                            		alt="Get INFECT on Google Play"
                            		className="app-banner__app-store-icon"
                            	/>
                            </a>

							<span className="app-banner__button-container app-banner__button-container--close">
								<button className="app-banner__button button button--close" onClick={this.close}>&times;</button>
							</span>

						</p>
				</div>
				}
			</div>
		);
	}

}
