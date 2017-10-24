import test from 'tape';
import Store from './store';
import { observe } from 'mobx';


test('stores on init', (t) => {
	const values = [{ id: 1 }, { id: 2 }];
	const store = new Store(values);
	t.equal(store.get().size, 2);
	t.end();
});

test('returns values', (t) => {
	const store = new Store([{ id: 1 }, { id: 2 }]);
	t.equal(store.get().size, 2);
	t.equal(store.getAsArray().length, 2);
	t.end();
});

test('throws if id is missing', (t) => {
	t.throws(() => new Store([{ id: 1 }, { a: 2 }]), /"a":2/);
	t.end();
});

test('adds items', (t) => {
	const store = new Store([{ id: 1 }, { id: 2 }]);
	store.add({ id: 3 });
	t.equals(store.get().size, 3);
	t.end();
});

test('does not overwrite items', (t) => {
	const store = new Store([{ id: 1 }, { id: 2 }]);
	t.throws(() => store.add({ id: 2 }));
	t.doesNotThrow(() => store.add({ id: 2 }, true));
	t.equals(store.get().size, 2);
	t.end();
});

test('uses idGeneratorFunction if provided', (t) => {
	const store = new Store([], (item) => item.idA + '/' + item.idB);
	t.doesNotThrow(() => store.add({ idA: 3, idB: 3 }));
	// Duplicate entry
	t.throws(() => store.add({ idA: 3, idB: 3 }));
	store.add({ idA: 3, idB: 4 });
	t.equals(store.getById('3/3') !== undefined, true);
	t.equals(store.getAsArray().length, 2);
	t.end();
});

test('clears items', (t) => {
	const store = new Store();
	store.add({id: 1, value: 'test1'});
	store.add({id: 2, value: 'test2'});
	store.clear();
	t.equals(store.get().size, 0);
	t.end();
});

test('returns default status', (t) => {
	const store = new Store();
	t.equals(store.status.identifier, 'ready');
	t.end();
});

test('prevents setting of invalid states', (t) => {
	const store = new Store();
	t.throws(() => store.setFetchPromise(null), /Promise/);
	t.end();
});

test('setting fetchPromise updates status and promise', (t) => {
	const store = new Store();
	t.equals(store.status.identifier, 'ready');
	store.setFetchPromise(new Promise((resolve) => {
		setTimeout(resolve, 50);
	}));
	t.equals(store.status.identifier, 'loading');

	observe(store.status, (status) => {
		t.equals(status.newValue, 'ready');
		t.end();
	});

});

test('sets status to error on errors', (t) => {
	const store = new Store();
	store.setFetchPromise(new Promise((resolve, reject) => {
		setTimeout(() => {
			reject();
		}, 50);
	}));
	observe(store.status, (status) => {
		t.equals(store.status.identifier, 'error');
		t.end();
	});
});



