import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

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

	openAbout() {
		document.querySelector('.overlay').classList.toggle('overlay--open'); 
		document.querySelector('.button--info').classList.toggle('button--info-active');
	}

	@action updateVisibility(visible) {
		this.displayDisclaimer = !!visible;
	}

	close() {
		this.updateVisibility(false);
		localStorage.setItem(this._localStoragePropertyName, 1);
	}

	render() {
		// See https://github.com/infect-org/frontend/issues/64
		return (
			<div>
				{ this.displayDisclaimer && 
				<div className="main__disclaimer disclaimer">
					
						<p>
							<span className="disclaimer__text">INFECT is in a beta stage. It may contain bugs and does contain unvalidated data. If you have any questions or discover any issues, please contact <a href="mailto:info@infect.info">info@infect.info</a>.</span>
							<span className="disclaimer__button-container disclaimer__button-container--close">
								<a className="disclaimer__button" onClick={ () => this.close() }>Close</a>
							</span>
							<span className="disclaimer__button-container">
								<a className="disclaimer__button" onClick={ () => this.openAbout() }>Information</a>
							</span>
						</p>	
				</div>
				}
			</div>
		);
	}

}