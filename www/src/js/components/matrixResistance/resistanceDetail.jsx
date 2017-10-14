import React from 'react';
import { observer } from 'mobx-react';
import { numberWithThousandsSeparators } from '../../helpers/formatters';
import { supportsDominantBaseline } from '../../helpers/svgPolyfill';

@observer
class ResistanceDetail extends React.Component {

	constructor() {
		super();
		this._radius = 35;
	}

	_getTransformation() {
		return `translate(${ this.props.resistance.xPosition.left }, ${ this.props.resistance.yPosition.top })`;
	}

	render() {
		return(
			<g transform={ this._getTransformation() } className="resistanceMatrix__resistanceDetail">

				{ /* Definition for blur filter (drop shadow) */ }
				<defs>
					{ /* https://stackoverflow.com/questions/6555600/gaussian-blur-cutoff-at-edges */ }
					<filter id="resistanceDetailBlur" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur in="SourceGraphic" stdDeviation="5" />
					</filter>
				</defs>

				{ /* Shadow – placed before real circle to be behind it */ }
				<circle r={ this._radius } filter="url(#resistanceDetailBlur)"
					cx={ this._radius - this.props.defaultRadius } cy={ this._radius - this.props.defaultRadius }
					className="resistanceMatrix__resistanceDetailCircleShadow">
				</circle>

				{ /* Background cirlce */ }
				<circle r={ this._radius } fill={ this.props.resistance.backgroundColor } 
					cx={ this._radius - this.props.defaultRadius } cy={ this._radius - this.props.defaultRadius }
					className="resistanceMatrix__resistanceDetailCircle">
				</circle>

				{ /* Value */ }
				<text fill={ this.props.resistance.fontColor } dominantBaseline="alphabetical"  textAnchor="middle"
					dy={ supportsDominantBaseline(0, '0em') }
					x={ this._radius - this.props.defaultRadius } y={ this._radius - this.props.defaultRadius } 
					className="resistanceMatrix__resistanceDetailValueText">
					{Math.round(this.props.resistance.mostPreciseValue.value * 100)}
					<tspan className="resistanceMatrix__resistanceDetailValuePercentSign">%</tspan>
				</text>

				{ /* Sample Size */ }
				<text fill={ this.props.resistance.fontColor } dominantBaseline="hanging"  textAnchor="middle" 
					x={ this._radius - this.props.defaultRadius } y={ this._radius - this.props.defaultRadius + 5 } 
					dy={ supportsDominantBaseline(0, '1.1em') }
					className="resistanceMatrix__resistanceDetailSampleSizeText">
					N={numberWithThousandsSeparators(this.props.resistance.mostPreciseValue.sampleSize)}
				</text>
				
			</g>
		);
	}
}

export default ResistanceDetail;