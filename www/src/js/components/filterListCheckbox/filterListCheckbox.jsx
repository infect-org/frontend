import React from 'react';
import {observer} from 'mobx-react';

@observer
export default class FilterListCheckbox extends React.Component {

	constructor() {
		super();
		this.state = {
			id: 'id_' + Math.random().toString().replace('.', '')
		};
	}

	render() {
		return (
            <li className={ 'list-item--' + (this.props.inputType === 'radio' ? 'radio' : 'checkbox') + ' group__list-item' }>
                <input type={ this.props.inputType === 'radio' ? 'radio' : 'checkbox' } id={ this.state.id } value={ this.props.value } 
                	onChange={ this.props.onChangeHandler } checked={ this.props.checked } name={ this.props.inputName }/>
                <label htmlFor={ this.state.id } className="side-label">{ this.props.name }</label>
            </li>
		);
	}
}