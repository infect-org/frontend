(function() {
    'use strict';

    const distributed   = require('distributed-prototype');
    const log           = require('ee-log');


    module.exports = class AntibioticController extends distributed.WebsiteController {


        constructor() {
            super('antibiotic');
        }





        get(req, res) {
            new distributed.RelationalRequest({
                  action: 'list'
                , service: 'infect'
                , resource: 'antibiotic'
            }).send(this).then((APIResponse) => {
                if (APIResponse.status === 'ok') res.send(APIResponse.data);
                else res.status(500).send(`API Error (${APIResponse.code}): ${APIResponse.message}`);
            }).catch(log);
        }




        load(app) {
            app.get('/antibiotic', this.get.bind(this));
        }
    }
})();
