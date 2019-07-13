import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

export default @observer class OpenDiagnosisDrawerButton extends React.Component {

    constructor(...props) {
        super(...props);
        this.openDrawer = this.openDrawer.bind(this);
    }

    openDrawer() {
        this.props.drawerViewModel.open();
    }

    /**
     * Button shall only be displayed if drawer's content references a Guideline. If drawer is
     * used for other content (or drawer is already visible), button shall be hidden.
     */
    @computed get isVisible() {
        return (
            this.props.drawerViewModel &&
            this.props.drawerViewModel.contentType === 'guideline' &&
            this.props.drawerViewModel.isOpen === false
        );
    }

    render() {
        if (!this.isVisible) return null;
        return (
            <button onClick={this.openDrawer}>
                Show Guideline
            </button>
        );
    }
}
