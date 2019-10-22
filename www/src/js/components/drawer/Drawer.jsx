import React from 'react';
import debug from 'debug';
import { observer } from 'mobx-react';
import DrawerGuidelineContent from './DrawerGuidelineContent.jsx';

const log = debug('infect:Drawer');

export default @observer class Drawer extends React.Component {

    constructor(...props) {
        super(...props);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    closeDrawer() {
        log('Close button clicked');
        this.props.drawerViewModel.close();
    }

    getVisibilityClass() {
        return this.props.drawerViewModel && this.props.drawerViewModel.isOpen ? 'open' : 'hidden';
    }

    /**
     * If drawer is empty, add class isEmpty to not show CSS animations. They would not look good
     * with an empty (white) drawer – hide instantly therefore.
     * @return {String}     Class that is added to drawer
     */
    getContentClass() {
        return !this.props.drawerViewModel || !this.props.drawerViewModel.content ? 'is-empty' : '';
    }

    render() {
        return (
            <div
                className={`drawer ${this.getVisibilityClass()} ${this.getContentClass()}`}
            >
                <button
                    onClick={this.closeDrawer}
                    className={'drawer__close-button button button--close-drawer'}
                >&times;</button>
                {
                    this.props.drawerViewModel &&
                    this.props.drawerViewModel.contentType === 'guideline' &&
                    <DrawerGuidelineContent content={this.props.drawerViewModel.content} />
                }
            </div>
        );
    }

}
