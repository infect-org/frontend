(function() {
	'use strict';


	const distributed           = require('distributed-prototype');
    const express               = require('express');
    const path                  = require('path');
    const log                   = require('ee-log');



    const ResistanceController  = require('./controller/ResistanceController');
    const BacteriaController    = require('./controller/BacteriaController');
    const AntibioticController  = require('./controller/AntibioticController');
    const DiagnosisController  = require('./controller/DiagnosisController');



	module.exports = class InfectFrontend extends distributed.WebsiteService {



		constructor(options) {
			super(options);

            // rgistr routes
            this.registerResource(new ResistanceController());
            this.registerResource(new BacteriaController());
            this.registerResource(new AntibioticController());
            this.registerResource(new DiagnosisController());
		}





        express(app) {
            super.express(app);

            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', '*');
                res.header('Access-Control-Allow-Methods', '*');
                next();
            });

            // register static files
            app.use(express.static(path.join(__dirname, '../www'), {fallthrough: true}));
        }
	}
})();
