import test from 'tape';
import fetchMock from 'fetch-mock';
import ResistancesFetcher from './resistancesFetcher';
import Store from '../../helpers/store';
import Bacterium from '../bacteria/bacterium';
import { observable } from 'mobx';

function setupFetcher() {
	const antibiotics = {
		get: function() {
			return { 
				values: function() {
					return [{
						name: 'amoxicillin name',
						identifier: 'amoxicillin',
						id: 4
					}];
				} 
			};
		}
	};
	const bacteria = {
		get: function() {
			return { 
				values: function() {
					return [new Bacterium(5, 'acinetobacter sp.')];
				} 
			};
		}
	};
	return {
		bacteria
		, antibiotics
	};
}

test('handles resistance data correctly', (t) => {
	fetchMock.mock('/test', { status: 200, body: [{
        'id_bacterium': 5,
        'id_compound': 4,
        'sampleCount':100,
        'resistance':100, 
		'confidenceIntervalLowerBound': 75,
		'confidenceIntervalHigherBound': 100,
    }] });
	const { antibiotics, bacteria } = setupFetcher();
	const store = new Store([], () => 2);
	const stores = {
		antibiotics
		, bacteria
	};
	const fetcher = new ResistancesFetcher('/test', store, {}, [], stores, {
		getFiltersByType: () => {}
	});
	fetcher.getData();
	setTimeout(() => {
		t.equals(store.get().size, 1);
		const result = store.getById(2);
		t.equals(result.antibiotic.name, 'amoxicillin name');
		t.equals(result.bacterium.name, 'acinetobacter sp.');
		t.equals(result.values.length, 1);
		t.equals(result.values[0].sampleSize, 100);
		fetchMock.restore();
		t.end();	
	});
});


test('handles updates', (t) => {
	fetchMock
		.mock('/res', { status: 200, body: [{
			'id_bacterium': 5,
			'id_compound': 4,
			'sampleCount': 100,
			'resistance': 100,
			'confidenceIntervalLowerBound': 75,
			'confidenceIntervalHigherBound': 100,
		}] }, {
			headers: {
				filter: 'region.identifier=\'switzerland-all\'',
				select: '*, generics:region.identifier',
			}
		})
		.mock('/res', { status: 200, body: [{
			'id_bacterium': 5,
			'id_compound': 4,
			'sampleCount': 50,
			'resistance': 90,
			'confidenceIntervalLowerBound': 75,
			'confidenceIntervalHigherBound': 100,
		}] }, {
			headers: {
				filter: 'region.identifier=\'west\'',
				select: '*, generics:region.identifier',
			}
		});
	const { antibiotics, bacteria } = setupFetcher();
	const store = new Store([], () => 2);
	const stores = {
		antibiotics
		, bacteria
	};
	class SelectedFilters {
		@observable selectedFilters = [];
		@observable filterChanges = 0;
		getFiltersByType(type) {
			return this.selectedFilters.filter((item) => item.type === type);
		}
		addFilter(filter) {
			this.selectedFilters.push(filter);
			this.filterChanges++;
		}
	}
	const selectedFilters = new SelectedFilters();
	const fetcher = new ResistancesFetcher('/res', store, {}, [], stores, selectedFilters);
	fetcher.getData();
	setTimeout(() => {
		const result = store.getById(2);
		t.equals(result.values[0].sampleSize, 100);
		// Non-region filters don't change anything
		selectedFilters.addFilter({ type: 'unknown', value: 'bad' });
		t.equals(result.values[0].sampleSize, 100);
		// Does not fire when values are changed within a very short time (debounces)
		//selectedFilters.addFilter({ type: 'region', value: 'invalid'});
		selectedFilters.addFilter({ type: 'region', value: 'west'});
		t.equals(store.status.identifier, 'loading');
		// We have a debounce on resistanceFetcher
		setTimeout(() => {
			t.equals(store.getById(2).values[0].sampleSize, 50);
			t.equals(store.getById(2).values[0].value, .9);
			fetchMock.restore();
			t.end();	
		});
	});
});



