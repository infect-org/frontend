import test from 'tape';
import getVisibilityClassModifier from './getVisibilityClassModifier';

test('throws on invalid arguments', (t) => {
	t.throws(() => getVisibilityClassModifier(), /boolean/);
	t.throws(() => getVisibilityClassModifier(1), /boolean/);
	t.throws(() => getVisibilityClassModifier(1, 2), /boolean/);
	t.end();
});

test('returns correct modifier', (t) => {
	t.equals(getVisibilityClassModifier(false, true), '-is-hidden-was-visible');
	t.equals(getVisibilityClassModifier(false, false), '-is-hidden-was-hidden');
	t.equals(getVisibilityClassModifier(true, true), '-is-visible-was-visible');
	t.equals(getVisibilityClassModifier(true, false), '-is-visible-was-hidden');
	t.end();
});