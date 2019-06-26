import test from 'tape';
import getVisibilityClassModifier from './getVisibilityClassModifier';

test('throws on invalid arguments', (t) => {
	t.throws(() => getVisibilityClassModifier(), /boolean/);
	t.throws(() => getVisibilityClassModifier(1), /boolean/);
	t.throws(() => getVisibilityClassModifier(1, 2), /boolean/);
	t.end();
});

test('returns correct modifier', (t) => {
	t.equals(getVisibilityClassModifier(false, true), '-was-visible-is-hidden');
	t.equals(getVisibilityClassModifier(false, false), '-was-hidden-is-hidden');
	t.equals(getVisibilityClassModifier(true, true), '-was-visible-is-visible');
	t.equals(getVisibilityClassModifier(true, false), '-was-hidden-is-visible');
	t.end();
});