import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

@observer
export default class CorruptDataWarning extends React.Component {

	@observable displayCorruptDataWarning = true;

	constructor() {
		super();
		this._localStoragePropertyName = 'hideCorruptDataWarning';
		if (localStorage.getItem(this._localStoragePropertyName)) {
			this.updateVisibility(false);
		}
	}

	@action updateVisibility(visible) {
		this.displayCorruptDataWarning = !!visible;
	}

	close() {
		this.updateVisibility(false);
		localStorage.setItem(this._localStoragePropertyName, 1);
	}

	render() {
		// See https://github.com/infect-org/frontend/issues/64
		return (
			<div>
				{ this.displayCorruptDataWarning &&
				<div className="main__corruptdatawarning corruptdatawarning">

						<p className="corruptdatawarning__paragraph">
							<span className="corruptdatawarning__text">
								From <strong>September 26, 11:10h, to September 27, 14:40h (Swiss local time, UTC+2)</strong>, incorrect resistance data was displayed due to a technical error. We urge users to verify all data obtained during this period and apologise for any inconveniences. We have undertaken additional steps to prevent such errors in the future.
							</span>
							<span className="corruptdatawarning__button-container corruptdatawarning__button-container--close">
								<button className="corruptdatawarning__button button button--close" onClick={ () => this.close() }>&times;</button>
							</span>
						</p>
				</div>
				}
			</div>
		);
	}

}
