(function() {
    'use strict';

    const distributed   = require('distributed-prototype');
    const log           = require('ee-log');


    module.exports = class BacteriaController extends distributed.WebsiteController {


        constructor() {
            super('bacteria');
        }








        get(req, res) {
            new distributed.RelationalRequest({
                  action: 'list'
                , service: 'infect'
                , resource: 'bacteria'
            }).send(this).then((APIResponse) => {
                if (APIResponse.status === 'ok') res.send(APIResponse.data);
                else res.status(500).send(`API Error (${APIResponse.code}): ${APIResponse.message}`);
            }).catch(log);
        }






        load(app) {
            app.get('/bacteria', this.get.bind(this));
        }
    }
})();
