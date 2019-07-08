import React from 'react';
import { observer } from 'mobx-react';

export default @observer class OpenDrawerButton extends React.Component {

    constructor(...props) {
        super(...props);
        this.openDrawer = this.openDrawer.bind(this);
    }

    openDrawer() {
        this.props.drawerViewModel.open();
    }

    render() {
        return (
            <button onClick={this.openDrawer}>
                Show Drawer
            </button>
        );
    }
}
