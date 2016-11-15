(function() {
    'use strict';

    const distributed   = require('distributed-prototype');
    const log           = require('ee-log');


    module.exports = class ResistanceController extends distributed.WebsiteController {


        constructor() {
            super('resistance');
        }








        get(req, res) {
            new distributed.RelationalRequest({
                  action: 'list'
                , service: 'infect'
                , resource: 'resistance'
            }).send(this).then((APIResponse) => {
                if (APIResponse.status === 'ok') res.send(APIResponse.data);
                else res.status(500).send(`API Error (${APIResponse.code}): ${APIResponse.message}`);
            }).catch(log);
        }






        load(app) {
            app.get('/resistance', this.get.bind(this));
        }
    }
})();
