import test from 'tape';
import fetchMock from 'fetch-mock';
import ResistancesFetcher from './resistancesFetcher';
import Store from '../../helpers/store';

function setupFetcher(url = '/test') {
	const antibiotics = {
		get: function() {
			return { 
				values: function() {
					return [{
						name: 'amoxicillin'
					}];
				} 
			};
		}
	};
	const bacteria = {
		get: function() {
			return { 
				values: function() {
					return [{
						name: 'acinetobacter sp.'
					}];
				} 
			};
		}
	};
	return {
		bacteria
		, antibiotics
	};
}

test('handles data correctly', (t) => {
	fetchMock.mock('/test', { status: 200, body: [{
        "compoundName":"acinetobacter sp. / acinetobacter",
        "bacteriaName":"amoxicillin",
        "sampleCount":100,
        "resistanceImport":100
    }] });
	const { antibiotics, bacteria } = setupFetcher();
	const store = new Store([], () => 2);
	const stores = {
		antibiotics
		, bacteria
	};
	const fetcher = new ResistancesFetcher('/test', store, [], stores);
	fetcher.getData();
	setTimeout(() => {
		t.equals(store.get().size, 1);
		const result = store.getById(2);
		t.equals(result.antibiotic.name, 'amoxicillin');
		t.equals(result.bacterium.name, 'acinetobacter sp.');
		t.equals(result.values.length, 1);
		t.equals(result.values[0].sampleSize, 100);
		fetchMock.restore();
		t.end();	
	});
});




