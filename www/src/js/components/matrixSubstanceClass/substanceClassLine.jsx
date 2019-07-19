import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import getVisibilityClassModifier from '../../helpers/getVisibilityClassModifier';

/**
* Represents a vertical line in the matrix that holds substance classes apart
*/
export default @observer class SubstanceClassLine extends React.Component {

    constructor() {
        super();
        this._lineWeight = 1;
        this._wasVisible = true;
    }

    @computed get classModifier() {
        // We must also be watching transitions: If not, we only watch visible – which stays the
        // same when modifier should change from -was-hidden-is-visible to -was-visible-is-visible
        // and therefore won't call an update.
        this.transformation;
        const modifier = getVisibilityClassModifier(this.visible, this._wasVisible);
        this._wasVisible = this.visible;
        return modifier;
    }

    _getPreviousPosition() {
        return `translate(${(this._previousPosition && this._previousPosition.left) || 0}, ${(this._previousPosition && this._previousPosition.top) || 0})`;
    }

    @computed get transformation() {
        if (!this.visible) return this._getPreviousPosition();
        this._previousPosition = { left: this.leftPosition, top: 0 };
        return `translate(${this.leftPosition}, 0)`;
    }

    @computed get leftPosition() {
        return this.props.substanceClass.xPosition ?
            (this.props.substanceClass.xPosition.left || 0) : 0;
    }

    @computed get visible() {
        return !!this.props.substanceClass.xPosition &&
            this.props.substanceClass.xPosition.left !== undefined;
    }

    render() {
        return (
            <rect
                width={this._lineWeight}
                height={this.props.height || 0}
                fill={this.props.substanceClass.lineColor}
                transform={this.transformation}
                className={`resistanceMatrix__substanceClassLine resistanceMatrix__substanceClassLine--left-body ${this.classModifier}`}
            >
                {/* Set y to 0, will be covered by header */}
            </rect>
        );
    }

}
