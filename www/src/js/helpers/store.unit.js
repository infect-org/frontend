import test from 'tape';
import Store from './store';


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
	t.equal(store.get().size, 3);
	t.end();
});

test('does not overwrite items', (t) => {
	const store = new Store([{ id: 1 }, { id: 2 }]);
	t.throws(() => store.add({ id: 2 }));
	t.doesNotThrow(() => store.add({ id: 2 }, true));
	t.equal(store.get().size, 2);
	t.end();
});

test('uses idGeneratorFunction if provided', (t) => {
	const store = new Store([], (item) => item.idA + '/' + item.idB);
	t.doesNotThrow(() => store.add({ idA: 3, idB: 3 }));
	// Duplicate entry
	t.throws(() => store.add({ idA: 3, idB: 3 }));
	store.add({ idA: 3, idB: 4 });
	t.equal(store.getById('3/3') !== undefined, true);
	t.equal(store.getAsArray().length, 2);
	t.end();
});