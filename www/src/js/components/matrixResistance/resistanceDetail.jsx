import React from 'react';
import { observer } from 'mobx-react';
import { numberWithThousandsSeparators } from '../../helpers/formatters';
import { supportsDominantBaseline } from '../../helpers/svgPolyfill';
import { computed } from 'mobx';
import debug from 'debug';
import { resistanceTypes } from '@infect/frontend-logic';
const log = debug('infect:ResistanceDetailComponent');

@observer
class ResistanceDetail extends React.Component {

	constructor() {
		super();
		this._radius = 40;
	}

	@computed get transformation() {
		log('Get transformation for resistanceDetail');
		// Make sure resistanceDetail is not hidden behind matrix header (which has a higher z-index
		// due to it's fixed position when scrolling). 
		const correctTop = this.props.resistance.yPosition.top + this.props.defaultRadius;
		const top = Math.max(correctTop, this._radius);
		return `translate(${ this.props.resistance.xPosition.left + this.props.defaultRadius }, 
			${ top })`;
	}

	/**
	 * Returns the key of the most precise resistance type, as defined in resistanceTypes
	 * @returns {string}
	 */
	@computed get mostPreciseResistanceType() {
		const type = this.props.resistance.mostPreciseValue.type;
		const types = Object.keys(resistanceTypes);
		for (const resistanceType of types) {
			if (type === resistanceTypes[resistanceType]) return resistanceType;
		}
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
					dy={ supportsDominantBaseline('-0.4em', '-0.4em')} dx="2"
					className="resistanceMatrix__resistanceDetailValueText">
					{this.props.resistance.displayValue}
					{this.mostPreciseResistanceType === 'qualitative' &&
						<tspan className="resistanceMatrix__resistanceDetailValuePercentSign">%</tspan>
					}
				</text>

				{ /* Confidence Interval */ }
				<text fill={ this.props.resistance.fontColor } dominantBaseline="hanging"  textAnchor="middle" 
					dy={ supportsDominantBaseline('-0.4em', '0.5em')}
					className="resistanceMatrix__resistanceDetailSampleSizeText"
				>
					{this.mostPreciseResistanceType === 'qualitative' &&
						this.props.resistance.mostPreciseValue.confidenceInterval !== undefined &&
						<>
							CI { Math.round((1 - this.props.resistance.mostPreciseValue.confidenceInterval[1]) * 100) }–
							{ Math.round((1 - this.props.resistance.mostPreciseValue.confidenceInterval[0]) * 100) }%
						</>
					}
					{this.mostPreciseResistanceType === 'mic' &&
						<>
							MIC90
						</>
					}
				</text>

				{ /* Sample Size */ }
				<text fill={ this.props.resistance.fontColor } dominantBaseline="hanging"  textAnchor="middle" 
					dy={ supportsDominantBaseline('0.6em', '1.5em')}
					className="resistanceMatrix__resistanceDetailSampleSizeText">
					N={ numberWithThousandsSeparators(this.props.resistance.mostPreciseValue.sampleSize) }
				</text>
				
			</g>
		);
	}
}

export default ResistanceDetail;