import React from 'react';
import { observer } from 'mobx-react';
import debug from 'debug';
const log = debug('infect:InfoOverlayButtonComponent');

@observer
export default class InfoOverlayButton extends React.Component {

	toggleInfoOverlay() {
		log('Toggle');
		this.props.infoOverlay.toggle();
	}

	render() {
		return (
            <button 
				className={ 'button button--info ' + (this.props.infoOverlay.visible ? 'button--info-active' : '') }
				onClick={ () => this.toggleInfoOverlay() }>
				{ !this.props.infoOverlay.visible && 'i' }
				{ this.props.infoOverlay.visible && 
					<span>&times;</span>
				}
            </button>
		);
	}

}
