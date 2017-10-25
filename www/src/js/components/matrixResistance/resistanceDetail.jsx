import React from 'react';
import { observer } from 'mobx-react';
import { numberWithThousandsSeparators } from '../../helpers/formatters';
import { supportsDominantBaseline } from '../../helpers/svgPolyfill';
import { computed } from 'mobx';
import debug from 'debug';
const log = debug('infect:ResistanceDetailComponent');

@observer
class ResistanceDetail extends React.Component {

	constructor() {
		super();
		this._radius = 35;
	}

	@computed get transformation() {
		log('Get transformation for resistanceDetail');
		return `translate(${ this.props.resistance.xPosition.left + this.props.defaultRadius }, 
			${ this.props.resistance.yPosition.top + this.props.defaultRadius })`;
	}

	render() {
		return(
			<g transform={ this.transformation } className="resistanceMatrix__resistanceDetail">

				{ /* Definition for blur filter (drop shadow) */ }
				<defs>
					{ /* https://stackoverflow.com/questions/6555600/gaussian-blur-cutoff-at-edges */ }
					<filter id="resistanceDetailBlur" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur in="SourceGraphic" stdDeviation="5" />
					</filter>
				</defs>

				{ /* Shadow – placed before real circle to be behind it */ }
				<circle r={ this._radius } filter="url(#resistanceDetailBlur)"
					className="resistanceMatrix__resistanceDetailCircleShadow">
				</circle>

				{ /* Background cirlce */ }
				<circle r={ this._radius } fill={ this.props.resistance.backgroundColor } 
					className="resistanceMatrix__resistanceDetailCircle">
				</circle>

				{ /* Value */ }
				{ /* dy -2: Adobe's font is not correctly middled, adjust by 2 px */ }
				<text fill={ this.props.resistance.fontColor } dominantBaseline="alphabetical"  textAnchor="middle"
					dy={ supportsDominantBaseline('-2', '0em')} dx="2"
					className="resistanceMatrix__resistanceDetailValueText">
					{Math.round(this.props.resistance.mostPreciseValue.value * 100)}
					<tspan className="resistanceMatrix__resistanceDetailValuePercentSign">%</tspan>
				</text>

				{ /* Sample Size */ }
				<text fill={ this.props.resistance.fontColor } dominantBaseline="hanging"  textAnchor="middle" 
					dy={ supportsDominantBaseline('0', '1.1em')}
					className="resistanceMatrix__resistanceDetailSampleSizeText">
					N={numberWithThousandsSeparators(this.props.resistance.mostPreciseValue.sampleSize)}
				</text>
				
			</g>
		);
	}
}

export default ResistanceDetail;