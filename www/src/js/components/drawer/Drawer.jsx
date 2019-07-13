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

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '800px',
                    backgroundColor: '#A7CCEB',
                    padding: 20,
                    zIndex: 10000,
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.7)',
                }}
                className={`myClassName myDrawer ${this.getVisibilityClass()}`}
            >
                { /** FABIAN: Remove fake css from index.html when writing real css */ }
                <button onClick={this.closeDrawer}>&times;</button>
                {
                    this.props.drawerViewModel &&
                    this.props.drawerViewModel.contentType === 'guideline' &&
                    <DrawerGuidelineContent content={this.props.drawerViewModel.content} />
                }
            </div>
        );
    }

}
