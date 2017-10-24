import test from 'tape';
import AntibioticsStore from './antibioticsStore';
import SubstanceClassesStore from './substanceClassesStore';
import AntibioticsFetcher from './antibioticsFetcher';
import fetchMock from 'fetch-mock';

test('handles data correctly', (t) => {
	fetchMock.mock('/test', [{
			id: 1
			, substanceClasses: [{
				id: 5
			}]
			, name: 'testAB'
			, iv: true
			, po: false
		}]);
	const abStore = new AntibioticsStore();
	const scStore = new SubstanceClassesStore();
	scStore.add({
		id: 5
		, name: 'testSC'
	});
	const fetcher = new AntibioticsFetcher('/test', abStore, [], scStore);
	fetcher.getData();
	setTimeout(() => {
		t.equals(abStore.get().size, 1);
		t.equals(abStore.getById(1).name, 'testAB');
		t.equals(abStore.getById(1).iv, true);
		t.equals(abStore.getById(1).substanceClass.id, 5);
		fetchMock.restore();
		t.end();
	});
});