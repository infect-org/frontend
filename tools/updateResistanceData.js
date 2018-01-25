'use strict';


const csv = require('csv');
const promisify = require('util').promisify;
const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const path = require('path');
const log = require('ee-log');




const fileMapping = new Map([
    ['import_summary_all', 'resistances'],
    ['import_summary_Central_East', 'resistances_central-east'],
    ['import_summary_Central_West', 'resistances_central-west'],
    ['import_summary_East', 'resistances_east'],
    ['import_summary_Geneva area', 'resistances_geneva'],
    ['import_summary_North_East', 'resistances_north-east'],
    ['import_summary_North_West', 'resistances_north-west'],
    ['import_summary_South', 'resistances_south'],
    ['import_summary_West', 'resistances_west'],
]);





class Import {

    async execute(mode) {
        for (const [inputFile, outputFile] of fileMapping.entries()) {
            const inFile = path.join(__dirname, './data/', mode, (mode === 'beta' ? 'beta_' : '')+inputFile+'.csv');
            const outFile = path.join(__dirname, '../www/src/js/data/', mode, outputFile+'.json');

            const data = await readFile(inFile);
            const parsedData = await this.parseCSV(data.toString());

            const output = parsedData.slice(1).map((row) => ({
                bacteriaName: row[0],
                compoundName: row[1],
                sampleCount: parseInt(row[2], 10),
                resistanceImport: parseInt(row[4], 10),
                confidenceIntervalHigherBound: parseInt(row[6], 10),
                confidenceIntervalLowerBound: parseInt(row[5], 10),
            }));


            await writeFile(outFile, JSON.stringify(output, null, 4));
        }
    }




    parseCSV(data) {
        return new Promise((resolve, reject) => {
            csv.parse(data, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}




new Import().execute('live').then(() => {
    log.success('done');
}).catch(log);


new Import().execute('beta').then(() => {
    log.success('done');
}).catch(log);