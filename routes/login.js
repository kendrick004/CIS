var express = require('express');
var router = express.Router();

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

module.exports = router;