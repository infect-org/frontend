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
            <li className="group__list-item list-item--checkbox">
                <input type="checkbox" id={this.state.id} value={this.props.value} 
                	onChange={this.props.onChangeHandler} checked={this.props.checked} />
                <label htmlFor={this.state.id} className="side-label">{this.props.name}</label>
            </li>
		);
	}
}