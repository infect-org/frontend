import test from 'tape';
import {numberWithThousandsSeparators} from './formatters';

test('thousands separator', (t) => {
	t.equals(numberWithThousandsSeparators(5), '5');
	t.equals(numberWithThousandsSeparators(500), '500');
	t.equals(numberWithThousandsSeparators(50000), '50\'000');
	t.end();
});