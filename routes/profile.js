var express = require('express');
var router = express.Router();
var user = require('../models/user');
var pw = require('../functions/password.js');

router.get('/', function(request, response, next) {
    if(request.session.login) {
        var data = {
            page: {
                title: "CIS | Profile",
                name: "Profile"
            },
            user: request.session.login,
        };
        response.render('profile.html', data);
    } else {
        response.redirect('login');
    }
});

router.post('/update', function(request, response, next) {
    var query_validation = "";
    if(request.body.username !== undefined) { request.body.username != "" ? query_validation += "username = '" + request.body.username + "', " : query_validation += "username = NULL, "; }
    if(request.body.password !== undefined) { request.body.password != "" ? query_validation += "password = '" + pw.hash(request.body.password) + "', " : query_validation += "password = NULL, "; }
    if(request.body.name !== undefined) { request.body.name != "" ? query_validation += "name = '" + request.body.name + "', " : query_validation += "name = NULL, "; }
    if(request.body.position !== undefined) { request.body.position != "" ? query_validation += "position = '" + request.body.position + "', " : query_validation += "position = NULL, "; }
    if(request.body.role !== undefined) { request.body.role != "" ? query_validation += "role = '" + request.body.role + "', " : query_validation += "role = NULL, "; }
    if(request.body.department !== undefined) { request.body.department != "" ? query_validation += "department = '" + request.body.department + "', " : query_validation += "department = NULL, "; }

    query_validation = query_validation.substring(0, query_validation.length - 2);

    user.updateProfile(query_validation, request.body.id, function(result) {
        if(result.result.status == 1) {
            //update session
            request.session.login = {
                id: request.body.id,
                username: request.body.username,
                name: request.body.name,
                position: request.body.position,
                role: request.body.role,
                role_name: request.session.login.role_name,
                role_description: request.session.login.role_description,
                department: request.body.department
            };
            
            var cb = { success: 1 };
            response.send(JSON.stringify(cb));
        } else {
            response.send("Something wrong happened when updating the profile. Error: " + result.result.err);
        }        
    });
});

module.exports = router;