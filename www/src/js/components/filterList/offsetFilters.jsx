import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import generateFilterList from './generateFilterList';
import debug from 'debug';
const log = debug('infect:OffsetFilters');

@observer
class OffsetFilters extends React.Component {

	constructor(props) {
		super(props);
		this.updateSampleSizeOffsetFilter = this.updateSampleSizeOffsetFilter.bind(this);
		this.updateSusceptibilityOffsetFilter = this.updateSusceptibilityOffsetFilter.bind(this);
	}

	updateSampleSizeOffsetFilter(ev) {
		const { value } = ev.target;
		log('Set min sampleSize to %d', value);
		this.props.offsetFilters.setFilter('sampleSize', 'min', Number(value));
	}

	@computed get relativeSampleSizeOffset() {
		return this.props.offsetFilters.filters.get('sampleSize').min;
	}

	updateSusceptibilityOffsetFilter(ev) {
		const { value } = ev.target;
		log('Set min susceptibility to %d', value);
		// Filters must be between 0 and 1 (not 0 and 100 for percent)
		this.props.offsetFilters.setFilter('susceptibility', 'min', Number(value) / 100);
	}

	@computed get relativeSusceptibilityOffset() {
		return this.props.offsetFilters.filters.get('susceptibility').min * 100;
	}

	render() {
		return (
			<div>
				<h3 className="gray margin-top">Sample Size{' '}
					<span className="white">
						N &ge; {(this.props.offsetFilters.filters.get('sampleSize').min).toFixed(0)}
					</span>
				</h3>
				<div className="slider">
					<div className="slider__container">
						<div className="slider__container__before">
							{/* Display lower threshould depending on tenantConfig; RDA makes sure
								no values below lower threshould are returned, it suffices
								therefore if the correct value is *displayed* (we don't have to
								filter by it) */ }
							{this.props.offsetMinimumValue}
						</div>
						<div className="slider__container__range">
							<input
								value={this.relativeSampleSizeOffset}
								className="slider__range" 
								type="range"
								min={this.props.offsetMinimumValue}
								max="1000"
								onChange={this.updateSampleSizeOffsetFilter}
							/>
						</div>
						<div className="slider__container__after">&ge;1000</div>
					</div>
				</div>
				<h3 className="gray margin-top">Susceptibility{' '}
					<span className="white">
						&ge;{this.relativeSusceptibilityOffset.toFixed(0)}%
					</span>
				</h3>
				<div className="slider">
					<div className="slider__container">
						<div className="slider__container__before">0%</div>
						<div className="slider__container__range">
							<input
								value={this.relativeSusceptibilityOffset}
								className="slider__range" 
								type="range"
								onChange={this.updateSusceptibilityOffsetFilter}
							/>
						</div>
						<div className="slider__container__after">100%</div>
					</div>
				</div>
			</div>
		);
	}
}

export default OffsetFilters;