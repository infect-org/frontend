import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class SelectedFilter extends React.Component {

	render() {
		return (
            <li className={`group__list-item list-item ${this.props.type === 'diagnoses' && 'list-item--diagnosis'}`}>
                <div className="label label--rounded">
                    <p className="label--smaller label--nomargin">
                        {this.props.filter.property.niceName}
                    </p>
                    <p className="label--bold label--nomargin">
                        {this.props.filter.niceValue}
                    </p>
                </div>
                <button 
                    onClick={() => this.props.removeFilterHandler(this.props.filter)}
                    className="button button--label"
                >
                    <span>&times;</span>
                </button>
            </li>
		);
	}

}