import React from 'react';
import { observer } from 'mobx-react';
import debug from 'debug';
const log = debug('infect:InfoOverlayButtonComponent');

@observer
export default class InfoOverlayButton extends React.Component {

	toggleInfoOverlay() {
		log('Toggle overlay');
		// this.props.infoOverlay.toggle();
		if (window.location.hash === '#information') {
			window.location.hash = '';
		} else {
			window.location.hash = '#information';
		}
	}

	render() {
		return (
            <button
				className={ 'button button--info ' + (this.props.infoOverlay.visible ? 'button--info-active' : '') }
				onClick={ () => this.toggleInfoOverlay() }>
				{ !this.props.infoOverlay.visible &&
					<div>
                        <span>&#9432;</span>
						<span>About <em>INFECT</em></span>
					</div>
				}
				{ this.props.infoOverlay.visible &&
					<span>&times;</span>
				}
            </button>
		);
	}

}
