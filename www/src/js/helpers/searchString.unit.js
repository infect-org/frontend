import test from 'tape';
import searchString from './searchString';

test('returns true if searchString is empty', (t) => {
	t.equals(searchString('test', ''), true);
	t.end();
});

test('handles empty values', (t) => {
	t.equals(searchString('', ''), true);
	t.equals(searchString('', 'test'), false);
	t.throws(() => searchString(undefined, 'test'), /value must be a string/);
	t.throws(() => searchString('test', undefined), /searchTerm must be a string/);
	t.end();
});

test('returns correct results', (t) => {
	t.equals(searchString('test', 'test'), true);
	// Upper/lower case
	t.equals(searchString('TeSt', 'tesT'), true);
	// Spaces
	t.equals(searchString('Te St0', 'tesT 0'), true);
	// Partial matches
	t.equals(searchString('asdftestasdf', 'test'), true);
	// Special characters
	t.equals(searchString('söne,rzöic. !hön', 'snerzichn'), true);
	t.equals(searchString('snerzichn,', 'sö ... nerzöichön'), true);

	// Negative matches
	t.equals(searchString('short', 'notshort'), false);

	t.end();
});