const { computed, useStrict, autorun, observable, action, reaction } = require('mobx');

useStrict(true);

const list = observable.array(['a'], { deep: false });

const values = computed(() => list.join('-'));

autorun(() => {
    console.error(values.get());
});

const act = action((val) => list.push(val));

setTimeout(() => {
    act('d');
    console.error('done');
}, 1000);

list.observe((data) => {
    console.log('o', data);
});

console.error(list);

