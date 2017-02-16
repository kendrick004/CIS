var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var pw = require('../functions/password.js');

router.get('/', function(request, response, next) {
    if(!request.session.login) {
        var data = {
            page: {
                title: "CIS | Log In",
                name: "Login"
            }
        };
        response.render('login.html', data);
    } else {
        response.redirect('/');
    }
});

router.post('/', function(request, response, next) {
    user.checkUser(request.body.username, function(result) {
        var res = result.result;
        if(res.status == 1) {
            if(res.rows.length > 0) {
                if(pw.validate(res.rows[0].password, request.body.password)) {
                    request.session.login = {
                        id: res.rows[0].id,
                        username: res.rows[0].username,
                        name: res.rows[0].name,
                        position: res.rows[0].position,
                        role: res.rows[0].role,
                        role_name: res.rows[0].role_name,
                        role_description: res.rows[0].role_description,
                        department: res.rows[0].department,
                    };
                    var cb = {
                        success: 1,
                        msg: 'Login Success!'
                    };
                    response.send(JSON.stringify(cb));
                } else {
                    var cb = {
                        success: 0,
                        msg: 'Username or password is incorrect.'
                    };
                    response.send(JSON.stringify(cb));
                }
            } else {
                var cb = {
                    success: 0,
                    msg: 'Username or password is incorrect.'
                };
                response.send(JSON.stringify(cb));
            }
        } else {
            response.send("Something bad happened. Try again.");
        }
    })
});

module.exports = router;