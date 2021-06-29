import { storeStatus } from '@infect/frontend-logic';
import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

@observer
export default class MatrixLoadingOverlay extends React.Component {

	@computed get loading() {
		return this.props.stores.some((store) => {
			return store.status.identifier === storeStatus.loading;
		});
	}

	render() {
		return(
			<div className={ 'resistanceMatrix__overlay ' + (this.loading ? 'resistanceMatrix__overlay--active' : '') }>
                <img src="img/logo_spinner.svg" />
            </div>
		);
	}

}
