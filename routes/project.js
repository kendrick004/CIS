var express = require('express');
var router = express.Router();
var project = require('../models/project');
var moment = require('moment');

router.get('/', function(request, response, next) {
    if(request.session.login) {
        project.getListProject(request.session.login.role, request.session.login.id, function(result) {
            if(result.result.status == 1) {
                var data = {
                    page: {
                        title: "CIS | Project",
                        name: "Project"
                    },
                    moment: moment,
                    user: request.session.login,
                    success: 1,
                    project: result.result,
                    users: result.result2,
                    clients: result.result3
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

router.post('/id', function(request, response, next) {
    project.getProject(request.body.id, function(result) {
        if(result.result.status == 1) {
            var cb = {
                success: 1,
                project: result.result.rows[0],
                milestone: result.result2,
                valueframe: result.result3
            };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when getting the opportunity. Error: " + result.result.err);
        }        
    });
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
    if(request.body.project_name !== undefined) { request.body.project_name != "" ? query_validation += "name = '" + request.body.project_name + "', " : query_validation += "name = NULL, "; }
    if(request.body.client_id !== undefined) { request.body.client_id != "" ? query_validation += "client_id = " + request.body.client_id + ", " : query_validation += "client_id = NULL, "; }
    if(request.body.duration !== undefined) { request.body.duration != "" ? query_validation += "duration = '" + request.body.duration + "', " : query_validation += "duration = NULL, "; }
    if(request.body.assigned_to !== undefined) { request.body.assigned_to != "" ? query_validation += "assigned_to = " + request.body.assigned_to + ", " : query_validation += "assigned_to = NULL, "; }

    query_validation = query_validation.substring(0, query_validation.length - 2);

    var query_personnel = ""
    if(request.body.sales !== undefined) { request.body.sales != "" ? query_personnel += "sales = '" + request.body.sales + "', " : query_personnel += "sales = NULL, "; }
    if(request.body.marketing !== undefined) { request.body.marketing != "" ? query_personnel += "marketing = '" + request.body.marketing + "', " : query_personnel += "marketing = NULL, "; }
    if(request.body.brand !== undefined) { request.body.brand != "" ? query_personnel += "brand = '" + request.body.brand + "', " : query_personnel += "brand = NULL, "; }
    if(request.body.finance !== undefined) { request.body.finance != "" ? query_personnel += "finance = '" + request.body.finance + "', " : query_personnel += "finance = NULL, "; }
    if(request.body.service !== undefined) { request.body.service != "" ? query_personnel += "service = '" + request.body.service + "', " : query_personnel += "service = NULL, "; }
    if(request.body.software !== undefined) { request.body.software != "" ? query_personnel += "software = '" + request.body.software + "', " : query_personnel += "software = NULL, "; }
    if(request.body.hardware !== undefined) { request.body.hardware != "" ? query_personnel += "hardware = '" + request.body.hardware + "', " : query_personnel += "hardware = NULL, "; }
    if(request.body.maintenance !== undefined) { request.body.maintenance != "" ? query_personnel += "maintenance = '" + request.body.maintenance + "', " : query_personnel += "maintenance = NULL, "; }
    if(request.body.executive !== undefined) { request.body.executive != "" ? query_personnel += "executive = '" + request.body.executive + "', " : query_personnel += "executive = NULL, "; }

    query_personnel = query_personnel.substring(0, query_personnel.length - 2);

    project.editProject(query_validation, request.body.id, function(result) {
        project.editProjectPersonnel(query_personnel, request.body.id, function(result2) {
            project.editProjectFrame(request.body.id, request.body.curr_valueframe, request.body.new_valueframe, function(result3) {
                if(result.result.status == 1) {            
                    if(result2.result.status == 1) {
                        if(result3.result.status == 1) {
                            var cb = { success: 1 };
                            response.send(JSON.stringify(cb));
                        } else {
                            response.send("Something wrong happened when updating the project. Error: " + result3.result.err);
                        }
                    } else {
                        response.send("Something wrong happened when updating the project. Error: " + result2.result.err);
                    }
                } else {
                    response.send("Something wrong happened when updating the project. Error: " + result.result.err);                
                }
            });
        });
    });
});

// router.post('/edit', function(request, response, next) {
//     var query_validation = "";
//     if(request.body.name !== undefined) { request.body.name != "" ? query_validation += "name = '" + request.body.name + "', " : query_validation += "name = NULL, "; }
//     if(request.body.client_id !== undefined) { request.body.client_id != "" ? query_validation += "client_id = " + request.body.client_id + ", " : query_validation += "client_id = NULL, "; }
//     if(request.body.duration !== undefined) { request.body.duration != "" ? query_validation += "duration = '" + request.body.duration + "', " : query_validation += "duration = NULL, "; }
//     if(request.body.assigned_to !== undefined) { request.body.assigned_to != "" ? query_validation += "assigned_to = " + request.body.assigned_to + ", " : query_validation += "assigned_to = NULL, "; }

//     query_validation = query_validation.substring(0, query_validation.length - 2);

//     project.editProject(query_validation, request.body.id, function(result) {
//         if(result.result.status == 1) {
//             var cb = { success: 1 };
//             response.send(JSON.stringify(cb));
//         } else {
//             response.send("Something wrong happened when updating the project. Error: " + result.result.err);
//         }
//     });
// });

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