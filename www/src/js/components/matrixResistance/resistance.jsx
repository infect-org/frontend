import React from 'react';
import debug from 'debug';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { supportsDominantBaseline } from '../../helpers/svgPolyfill';
import getVisibilityClassModifier from '../../helpers/getVisibilityClassModifier';

const log = debug('infect:ResistanceComponent');

@observer
class Resistance extends React.Component {

	constructor() {
		super();
		// On init, resistances are always visible
		this._wasVisible = true;
		this._handleClick = this._handleClick.bind(this);
	}

	_getPreviousPosition() {
		return `translate(${ (this._previousPosition && this._previousPosition.left) || 0}, 
			${ (this._previousPosition && this._previousPosition.top) || 0})`;
	}

	@computed get transformation() {
		const xPos = this.props.resistance.xPosition;
		const yPos = this.props.resistance.yPosition;
		if (!xPos || !yPos) return this._getPreviousPosition();
		// Center is always the middle of a regular (defaultRadius) circle
		const left = xPos.left + this.props.matrix.defaultRadius;
		const top = yPos.top + this.props.matrix.defaultRadius;
		// Store previous position: If resistance is hidden, it should just stay where
		// it is to not do unnecessary translations.
		this._previousPosition = { left: left, top: top };
		log('Resistance %o is placed at %d/%d', this, left, top);
		// IE11 does not know style: transform – use the transform attribute
		return `translate(${ left }, ${ top })`;
	}



	/**
	* Returns modifier for visibility class which determines the transitions.
	*/
	@computed get classModifier() {
		const visible = this.props.resistance.visible;
		// We must also be watching transitions: If not, we only watch visible – which stays the
		// same when modifier should change from -was-hidden-is-visible to -was-visible-is-visible
		// and therefore won't call an update.
		this.transformation;
		const modifier = getVisibilityClassModifier(visible, this._wasVisible);
		this._wasVisible = visible;
		return modifier;
	}

	/**
	* Bullets with sampleSize < 20 have opacity 0.5. See 
	*/
	@computed get opacity() {
		return this.props.resistance.matchesOffsets ? 1 : 0.2;
	}


	_handleMouseEnter = () => {
		this.props.matrix.setActiveResistance(this.props.resistance);
	}

	_handleMouseLeave = () => {
		this.props.matrix.setActiveResistance(undefined);
	}

	_handleClick() {
		const drawer = this.props.drawerViewModel;
		const sameValue = drawer.content === this.props.resistance.resistance;
		const { isOpen } = drawer;
		if (sameValue && isOpen) return drawer.close();
		if (sameValue && !isOpen) return drawer.open();
		else drawer.setContent(this.props.resistance.resistance)
	}

	render() {
		return(
			// Radius: sample size
			// Color: Resistance (for given population filters)
			<g transform={ this.transformation } 
				className={ `resistanceMatrix__resistance js-resistance ${this.classModifier} ${this.resistaceTypeClass}` }
				data-antibiotic={ this.props.resistance.resistance.antibiotic.name }
				data-bacterium={ this.props.resistance.resistance.bacterium.name }
				onMouseEnter={ this._handleMouseEnter}
				onMouseLeave={this._handleMouseLeave }
				onClick={this._handleClick}
			>
				{ /* use <g> for content to give it an opacity depending on smapleSize. We cannot set
				     opacity on parent g as this would overwrite the filters (opacity 0 if not visible) */ }
				<g style={ { opacity: this.opacity } }>
					{/* circle: center is at 0/0, therefore move by radius/radius */}
					<circle
						r={ this.props.resistance.radius }
						fill={ this.props.resistance.backgroundColor } 
						className="resistanceMatrix__resistanceCircle"
					>
					</circle>
					{ /* dy -2: Adobe's font is not correctly middled, adjust by 2 px */ }
					{ /* Don't display number if N < 20 */ }
					<text textAnchor="middle" fill={ this.props.resistance.fontColor }
						dominantBaseline="central" className="resistanceMatrix__resistanceText"
						dy={ supportsDominantBaseline('-2', '0.35em') }>
						{this.props.resistance.displayValue}
					</text>
				</g>
			</g>
		);
	}

}

export default Resistance;