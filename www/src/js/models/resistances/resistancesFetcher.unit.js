import test from 'tape';
import fetchMock from 'fetch-mock';
import ResistancesFetcher from './resistancesFetcher';

function setupFetcher(url = '/test') {
	let abResolver, bactResolver;
	const antibiotics = {
		fetchPromise: new Promise((resolve) => abResolver = resolve)
		, resolve: abResolver
		, status: 'loading'
		, get: function() {
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
		fetchPromise: new Promise((resolve) => bactResolver = resolve)
		, resolve: bactResolver
		, status: 'loading'
		, get: function() {
			return { 
				values: function() {
					return [{
						name: 'acinetobacter sp.'
					}];
				} 
			};
		}
	};
	const store = {
		status: 'loading'
		, items: []
		, setFetchPromise: function(promise) {
			this.fetchPromise = promise;
			promise.then(() => this.status = 'ready');
		}
		, add: function(item) {
			this.items.push(item);
		}
		, get: function() {
			return this.items;
		}
	};
	const filters = {

	};
	const fetcher = new ResistancesFetcher(url, { antibiotics, bacteria }, store, filters);
	return {
		bacteria
		, antibiotics
		, store
		, filters
		, fetcher
	};
}

test('throws on setup if params are missing', (t) => {
	t.throws(() => new ResistancesFetcher(), /missing/);
	t.throws(() => new ResistancesFetcher('test'), /missing/);
	t.throws(() => new ResistancesFetcher('test', 'test'), /missing/);
	t.throws(() => new ResistancesFetcher('test', {}), /missing/);
	t.throws(() => new ResistancesFetcher('test', {}, {}), /missing/);
	t.doesNotThrow(() => new ResistancesFetcher('test', {}, {}, {}), /missing/);
	t.end();
});

test('sets fetchPromise on resistancesStore', (t) => {
	fetchMock.mock('/test', { status: 200, body: [] });
	const { antibiotics, bacteria, store, filters, fetcher } = setupFetcher();
	fetcher.getData();
	// 'loading' while loading
	t.equals(store.status, 'loading');
	store.fetchPromise.then(() => {
		// Updates to 'ready' when data is fetched
		t.equals(store.status, 'ready');
	});
	antibiotics.resolve();
	bacteria.resolve();
	fetchMock.restore();
	t.end();
});

test('waits for antibiotics/bacteria', (t) => {
	fetchMock.mock('/test', { status: 200, body: [] });
	const { antibiotics, bacteria, store, filters, fetcher } = setupFetcher();
	fetcher.getData();
	bacteria.resolve();
	setTimeout(() => {
		// Not ready until bact/ab are ready
		t.equals(store.status, 'loading');
		antibiotics.resolve();
		// Ready when bact/ab are ready
		setTimeout(() => {
			t.equals(store.status, 'ready');
			fetchMock.restore();
			t.end();	
		}, 0);
	}, 10);
});


test('handles data correctly', (t) => {
	fetchMock.mock('/test', { status: 200, body: [{
        "compoundName":"acinetobacter sp. / acinetobacter",
        "bacteriaName":"amoxicillin",
        "sampleCount":100,
        "resistanceImport":100
    }] });
	const { antibiotics, bacteria, store, filters, fetcher } = setupFetcher();
	fetcher.getData();
	bacteria.resolve();
	antibiotics.resolve();
	setTimeout(() => {
		t.equals(store.get().length, 1);
		fetchMock.restore();
		t.end();	
	});
});




