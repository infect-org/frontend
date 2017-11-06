import test from 'tape';
import AntibioticsStore from './antibioticsStore';
import SubstanceClass from './substanceClass';
import SubstanceClassesStore from './substanceClassesStore';
import AntibioticsFetcher from './antibioticsFetcher';
import fetchMock from 'fetch-mock';

test('handles antibacteria data correctly', (t) => {
	fetchMock.mock('/test', [{
			id: 1
			, substanceClasses: [{
				id: 5
			}]
			, name: 'testAB'
			, iv: true
			, po: false
			, identifier: 'testId'
		}]);
	const abStore = new AntibioticsStore();
	const scStore = new SubstanceClassesStore();
	scStore.add(new SubstanceClass(5, 'testSC'));
	const fetcher = new AntibioticsFetcher('/test', abStore, [], scStore);
	fetcher.getData();
	setTimeout(() => {
		t.equals(abStore.get().size, 1);
		t.equals(abStore.getById(1).name, 'testAB');
		t.equals(abStore.getById(1).iv, true);
		t.equals(abStore.getById(1).identifier, 'testId');
		t.equals(abStore.getById(1).substanceClass.id, 5);
		fetchMock.restore();
		t.end();
	});
});