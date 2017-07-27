import {action, observable, autorun, whyRun, useStrict} from 'mobx';

useStrict(true);

class Test {
	@observable val = new Map();
	constructor() {
	//	this.val = observable.map();
	}
	@action add(value) {
		this.val.set(value.id, value);
	}
}

const test = new Test();

autorun(() => {
    console.log(test.val.size);
    whyRun();
});
test.val.set('id', 'test');
test.add({
	id: 3
	, value: 'sara'
});
