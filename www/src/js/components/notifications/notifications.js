import React from 'react';
import { observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import errorHandler from '../../models/errorHandler/errorHandler';

@observer
export default class Notifications extends React.Component {

    /**
    * Errors are always added, never removed; to hide errors, just update this.hiddenErrorCounter to
    * match current amount of errors
    */
    @observable hiddenErrorCounter = 0;

    @action hideErrors() {
        this.hiddenErrorCounter = errorHandler.errors.length;
    }

    @computed get showErrors() {
        return errorHandler.errors.length > this.hiddenErrorCounter;
    }

    render() {
        return (
            <div className={ 'notification-container ' + (this.showErrors ? 'notification-container--active' : '') }>
                <div className="notification__error-icon">
                    <a className="notification__link" onClick={ () => this.hideErrors() }>
                        <img src="/img/error.svg" />
                    </a>
                </div>
                <div className="notification__message message">
                    <h2>UPS, something went wrong!</h2>
                    { errorHandler.errors.map((err) => {
                        return <p key={ err.message }>{ err.message }</p>;
                    })}
                </div>
            </div>
        );
    }

}

