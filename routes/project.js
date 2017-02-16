var express = require('express');
var router = express.Router();
var project = require('../models/project');

router.get('/', function(request, response, next) {
    if(request.session.login) {
        project.getListProject(request.session.login.role, request.session.login.id, function(result) {
            if(result.result.status == 1) {
                var data = {
                    page: {
                        title: "CIS | Project",
                        name: "Project"
                    },
                    user: request.session.login,
                    success: 1,
                    project: result.result
                };
                response.render('project.html', data);
            } else {
                response.send("Something wrong happened when getting the projects. Error: " + result.result.err);
            }        
        });
    } else {
        response.redirect('login');
    }
});

router.post('/search', function(request, response, next) {
    project.searchProject(request.body.keyword, function(result) {
        if(result.result.status == 1) {
            var cb = {
                success: 1,
                client: result.result
            };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when getting the search project query. Error: " + result.result.err);
        }        
    });
});

router.post('/add', function(request, response, next) {
    project.addProject(request.body.name, request.session.login.id, function(result) {
        if(result.result.status == 1) {
            var cb = {
                success: 1,
                insert_id: result.result.rows.insertId
            };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when adding the project. Error: " + result.result.err);
        }
    });
});

router.post('/edit', function(request, response, next) {
    var query_validation = "";
    if(request.body.name !== undefined) { request.body.name != "" ? query_validation += "name = '" + request.body.name + "', " : query_validation += "name = NULL, "; }
    if(request.body.client_id !== undefined) { request.body.client_id != "" ? query_validation += "client_id = " + request.body.client_id + ", " : query_validation += "client_id = NULL, "; }
    if(request.body.duration !== undefined) { request.body.duration != "" ? query_validation += "duration = '" + request.body.duration + "', " : query_validation += "duration = NULL, "; }
    if(request.body.assigned_to !== undefined) { request.body.assigned_to != "" ? query_validation += "assigned_to = " + request.body.assigned_to + ", " : query_validation += "assigned_to = NULL, "; }

    query_validation = query_validation.substring(0, query_validation.length - 2);

    project.editProject(query_validation, request.body.id, function(result) {
        if(result.result.status == 1) {
            var cb = { success: 1 };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when updating the project. Error: " + result.result.err);
        }
    });
});

router.post('/delete', function(request, response, next) {
    project.deleteProject(request.body.id, function(result) {
        if(result.result.status == 1) {
            var cb = { success: 1 };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when deleting the project. Error: " + result.result.err);
        }
    });
});

module.exports = router;