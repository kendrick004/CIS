var express = require('express');
var router = express.Router();
var client = require('../models/client');

router.get('/', function(request, response, next) {
    if(request.session.login) {
        //add get clients
                var data = {
                    page: {
                        title: "CIS | Client",
                        name: "Client"
                    },
                    user: request.session.login,
                };
                response.render('client.html', data);
    } else {
        response.redirect('login');
    }
});

router.post('/search', function(request, response, next) {
    client.searchClient(request.body.keyword, function(result) {
        if(result.result.status == 1) {
            var cb = {
                success: 1,
                client: result.result
            };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when getting the search client query. Error: " + result.result.err);
        }        
    });
});

router.post('/add', function(request, response, next){
    client.addClient(request.body.name, request.body.address, request.body.type, function(result) {
        if(result.result.status == 1) {
            var cb = {
                success: 1,
                insert_id: result.result.rows.insertId
            };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when adding the client. Error: " + result.result.err);
        }
    });
});

router.post('/edit', function(request, response, next) {
    var query_validation = "";
    if(request.body.name !== undefined) { request.body.name != "" ? query_validation += "name = '" + request.body.name + "', " : query_validation += "name = NULL, "; }
    if(request.body.address !== undefined) { request.body.address != "" ? query_validation += "address = '" + request.body.address + "', " : query_validation += "address = NULL, "; }
    if(request.body.type !== undefined) { request.body.type != "" ? query_validation += "type = '" + request.body.type + "', " : query_validation += "type = NULL, "; }

    query_validation = query_validation.substring(0, query_validation.length - 2);

    client.editClient(query_validation, request.body.id, function(result) {
        if(result.result.status == 1) {
            var cb = { success: 1 };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when updating the client. Error: " + result.result.err);
        }        
    });
});

router.post('/delete', function(request, response, next) {
    client.deleteClient(request.body.id, function(result) {
        if(result.result.status == 1) {
            var cb = { success: 1 };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when deleting the opportunity. Error: " + result.result.err);
        }
    });
});

module.exports = router;