import test from 'tape';
import SelectedFilters from './selectedFilters';

function setupFilters() {
	const sf = new SelectedFilters();
	const value1 = {value: 1};
	const value2 = {value: 2};
	sf.addFilter(value1);
	sf.addFilter(value2);
	return {
		filter: sf
		, values: [value1, value2]
	};
}

test('add and return filters', (t) => {
	const { filter, values } = setupFilters();
	t.deepEquals(filter.filters, values);
	t.end();
});

test('does not add filters twice', (t) => {
	const { filter, values } = setupFilters();
	filter.addFilter({ value: 1 });
	t.deepEquals(filter.filters, values);
	t.end();
});

test('remove filters', (t) => {
	const { filter, values } = setupFilters();
	filter.removeFilter(values[0]);
	t.deepEquals(filter.filters, [values[1]]);
	t.end();
});

test('is selected', (t) => {
	const { filter, values } = setupFilters();
	t.equals(filter.isSelected(values[0]), true);
	t.equals(filter.isSelected({ values: 1 }), false);
	t.end();
});

test('filters for a certain type', (t) => {
	const sf = new SelectedFilters();
	const abFilter = {
		property: {
			entityType: 'antibiotic'
		}
		, value: 1
	};
	sf.addFilter(abFilter);
	sf.addFilter({
		property: {
			entityType: 'bacterium'
		}
		, value: 2
	});
	t.deepEquals(sf.getFiltersByType('antibiotic'), [abFilter]);
	t.end();
});

