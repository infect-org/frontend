import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import generateFilterList from './generateFilterList';
import debug from 'debug';
const log = debug('infect:OffsetFilters');

@observer
class OffsetFilters extends React.Component {


	_updateSampleSizeOffsetFilter(value) {
		log('Set min sampleSize to %d', value);
		this.props.offsetFilters.setFilter('sampleSize', 'min', value * 10);
	}

	@computed get _relativeSampleSizeOffset() {
		return this.props.offsetFilters.filters.get('sampleSize').min / 10;
	}

	_updateSusceptibilityOffsetFilter(value) {
		log('Set min susceptibility to %d', value);
		this.props.offsetFilters.setFilter('susceptibility', 'min', value / 100);
	}

	@computed get _relativeSusceptibilityOffset() {
		return this.props.offsetFilters.filters.get('susceptibility').min * 100;
	}

	render() {
		return (
			<div>
				<h3 className="gray margin-top">Sample Size 
					<span className="white"> N &ge; { (this.props.offsetFilters.filters.get('sampleSize').min).toFixed(0) }</span>
				</h3>
				<div className="slider">
					<div className="slider__container">
						<div className="slider__container__before">0</div>
						<div className="slider__container__range">
							<input value={ this._relativeSampleSizeOffset } className="slider__range" 
								type="range" onChange={ (ev) => this._updateSampleSizeOffsetFilter(ev.target.value) } />
						</div>
						<div className="slider__container__after">&ge;1000</div>
					</div>
				</div>
				<h3 className="gray margin-top">Susceptibility <span className="white">&ge;{ this._relativeSusceptibilityOffset.toFixed(0) }%</span></h3>
				<div className="slider">
					<div className="slider__container">
						<div className="slider__container__before">0%</div>
						<div className="slider__container__range">
							<input value={ this._relativeSusceptibilityOffset } className="slider__range" 
								type="range" onChange={ (ev) => this._updateSusceptibilityOffsetFilter(ev.target.value) } />
						</div>
						<div className="slider__container__after">100%</div>
					</div>
				</div>
			</div>
		);
	}
}

export default OffsetFilters;