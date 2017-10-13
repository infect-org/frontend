import test from 'tape';
import ResistanceMatrixView from './resistanceMatrixView';
import Resistance from './resistance';

function setupData(sampleSize = 1000, value = 1) {
	const resistance = new Resistance([{ type: 'import', sampleSize: sampleSize, value: value }]);
	const resistanceMatrixView = new ResistanceMatrixView(resistance);
	return {
		resistance
		, resistanceMatrixView
	};
}


test('returns most precise value', (t) => {
	const { resistanceMatrixView } = setupData();
	t.equals(resistanceMatrixView.mostPreciseValue.type.identifier, 'importResistance');
	t.end(); 
});

test('calculates colors', (t) => {
	const resistanceMatrixView1 = setupData().resistanceMatrixView;
	const resistanceMatrixView2 = setupData(1000, 0.5).resistanceMatrixView;
	t.deepEquals(resistanceMatrixView1.backgroundColor.toRgb(), { r: 237, g: 224, b: 222, a: 1 });
	t.deepEquals(resistanceMatrixView1.fontColor.toRgb(), { r: 153, g: 66, b: 51, a: 1 });
	t.deepEquals(resistanceMatrixView2.backgroundColor.toRgb(), { r: 224, g: 211, b: 108, a: 1 });
	t.deepEquals(resistanceMatrixView2.fontColor.toRgb(), { r: 71, g: 64, b: 6, a: 1 });
	t.end();
});