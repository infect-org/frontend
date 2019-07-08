import React from 'react';
import { observer } from 'mobx-react';

export default @observer class Drawer extends React.Component {

    constructor(...props) {
        super(...props);
        this.hideDrawer = this.hideDrawer.bind(this);
    }

    hideDrawer() {
        this.props.drawerViewModel.close();
    }

    getVisibilityClass() {
        return this.props.drawerViewModel.isOpen ? 'open' : 'hidden';
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '100px',
                    backgroundColor: 'salmon',
                    zIndex: 10000,
                }}
                className={`myClassName ${this.getVisibilityClass()}`}
            >
                <button onClick={this.hideDrawer}>&times;</button>
                TEST
            </div>
        );
    }

}
