// Install csv-parser first. Not in package.json as it's a temp solution.

/**
* Transforms export from google docs (table: substanceClasses) to the substanceClasses.json. 
* Uses ids to add IDs to scs. 
* substanceClasses-old.json is the original json file. 
*/

const parse = require('csv-parse');
const fs = require('fs');

const fileData = fs.readFileSync('INFECT Data Master - SubstanceClass.csv', { encoding: 'utf8' });
const IDs = JSON.parse(fs.readFileSync('ids.json', { encoding: 'utf8' }));

const result = [];

parse(fileData, (err, data) => {
	data.forEach((item, index) => {
		// Header
		if (index === 0) return;
		const identifier = item[1];
		const idRecord = IDs.find((item) => item.name === identifier);
		if (!idRecord) {
			console.error('ID record for', identifier, 'not found.');
			return;
		}
		const sc = {
			id: idRecord.id
			, name: item[6] || identifier[0].toUpperCase() + identifier.substr(1)
			, order: index
		};
		const parentName = item[2];
		if (parentName) {
			const parentId = IDs.find((item) => item.name === parentName).id;
			sc.parent = parentId;
		}
		if (item[7]) sc.color = item[7];
		result.push(sc);
	});

	console.log(result);
	fs.writeFileSync('../substanceClasses.json', JSON.stringify(result, null, 4));
	console.log('DONE');

});

