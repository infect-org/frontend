(function() {
    'use strict';

    const distributed   = require('distributed-prototype');
    const log           = require('ee-log');


    module.exports = class DiagnosisController extends distributed.WebsiteController {


        constructor() {
            super('diagnosis');
        }








        get(req, res) {
            new distributed.RelationalRequest({
                  action: 'list'
                , service: 'infect'
                , resource: 'diagnosis'
            }).send(this).then((APIResponse) => {
                if (APIResponse.status === 'ok') res.send(APIResponse.data);
                else res.status(500).send(`API Error (${APIResponse.code}): ${APIResponse.message}`);
            }).catch(log);
        }






        load(app) {
            app.get('/diagnosis', this.get.bind(this));
        }
    }
})();
