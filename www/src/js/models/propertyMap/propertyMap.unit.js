import test from 'tape';
import PropertyMap from './propertyMap';

function createMap() {
	const map = new PropertyMap();
	const config1 = {
		property1: {
			translation: 'Property 1'
			, valueTranslations: [
				{ value: true, translation: 'truthy' }
				// Function for a single value
				, { value: false, translation: () => 'falsy' }
			]
		}
	};
	const config2 = {
		property1: {
			// Function for property
			translation: (value) => `${ value }_translated`
			// Function for all values
			, valueTranslations: (value) => {
				return `translated_${ value }`;
			}
		}
	};
	const obj10 = {
		property1: true
	};
	const obj11 = {
		property1: false
		, property4: 'hidden'
	};
	const obj12 = {
		property1: true
	};
	const obj20 = {
		property1: true
		, property2: 'hidden'
	};
	return {
		map
		, configs: [config1, config2]
		, objects: [obj10, obj11, obj12, obj20]
	};
}

test('throws if config is missing', (t) => {
	const {map, objects} = createMap();
	t.throws(() => map.addEntity('test', objects[0]), /provide a configuration/);
	t.end();
});


// Test properties 

test('adds entity if config is present', (t) => {
	const {map, configs, objects} = createMap();
	map.addConfiguration('testEntity', configs[0]);
	map.addEntity('testEntity', objects[0]);
	t.deepEqual(map.getPropertiesForEntityType('testEntity'), [{ entityType: 'testEntity', name: 'property1', niceName: 'Property 1' }]);
	t.end();
});

test('only adds values available', (t) => {
	const {map, configs, objects} = createMap();
	map.addConfiguration('testEntity', configs[0]);
	map.addEntity('testEntity', objects[1]);
	t.deepEqual(map.getPropertiesForEntityType('testEntity'), [{ entityType: 'testEntity', name: 'property1', niceName: 'Property 1' }]);
	// Does not contain property4
	t.end();
});

test('accepts functions as property translations', (t) => {
	const {map, configs, objects} = createMap();
	map.addConfiguration('testEntity', configs[1]);
	map.addEntity('testEntity', objects[3]);
	t.deepEqual(map.getPropertiesForEntityType('testEntity'), [{ entityType: 'testEntity', name: 'property1', niceName: 'property1_translated' }]);
	t.end();
});


// Test values
test('translates values correctly', (t) => {
	const {map, configs, objects} = createMap();
	map.addConfiguration('entity0', configs[0]);
	map.addConfiguration('entity1', configs[1]);
	map.addEntity('entity0', objects[0]);
	map.addEntity('entity0', objects[1]);
	map.addEntity('entity1', objects[3]);
	const entity1values = map.getValuesForProperty('entity0', 'property1');
	t.equal(entity1values.length, 2);
	t.equal(entity1values[0].value, true);
	t.equal(entity1values[0].niceValue, 'truthy');
	t.equal(entity1values[1].niceValue, 'falsy');
	const entity2Values = map.getValuesForProperty('entity1', 'property1');
	t.equal(entity2Values.length, 1);
	t.equal(entity2Values[0].niceValue, 'translated_true');
	t.end();
});


