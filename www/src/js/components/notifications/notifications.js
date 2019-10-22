import React from 'react';
import { observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';

@observer
export default class Notifications extends React.Component {

    /**
    * Errors are always added, never removed; to hide errors, just update this.hiddenErrorCounter to
    * match current amount of errors
    */
    @observable hiddenErrorCounter = 0;

    @action hideErrors() {
        this.hiddenErrorCounter = this.props.errors.length;
    }

    @computed get showErrors() {
        return this.props.errors.length > this.hiddenErrorCounter;
    }

    render() {
        return (
            <div className={ `notification-container ${this.showErrors ? 'notification-container--active' : ''}` }>
                <div className="notification">
                    <div className="notification__error-icon">
                        <button className="notification__link button button--close" onClick={ () => this.hideErrors() }>
                            &times;
                        </button>
                    </div>
                    <div className="notification__message message">
                        <h2>Oops, something went wrong!</h2>
                        { this.props.errors.map(err => (
                            <p key={ err.message }>{ err.message }</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

}

