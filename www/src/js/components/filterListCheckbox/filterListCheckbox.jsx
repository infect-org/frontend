import React from 'react';
import { observer } from 'mobx-react';

export default @observer class FilterListCheckbox extends React.Component {

    state = {
        id: `id_${Math.random().toString().replace('.', '')}`,
    };
    handleClick = this.handleClick.bind(this);

    /**
     * If input type is radio, allow users to de-select radio button by clicking it.
     */
    handleClick(ev) {
        if (this.props.inputType === 'radio' && this.props.checked) {
            this.props.onChangeHandler();
            ev.preventDefault();
        }
    }

    render() {
        return (
            <li
                className={`list-item--${this.props.inputType === 'radio' ? 'radio' : 'checkbox'} group__list-item`}
                onClick={this.handleClick}
            >
                <input
                    type={this.props.inputType === 'radio' ? 'radio' : 'checkbox'}
                    id={this.state.id}
                    value={this.props.value}
                    onChange={this.props.onChangeHandler}
                    checked={this.props.checked}
                    name={this.props.inputName}
                />
                <label htmlFor={this.state.id} className="side-label">
                    {this.props.name}
                </label>
            </li>
        );
    }
}
