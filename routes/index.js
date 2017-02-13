var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
    if(request.session.login) {
        var data = {};
        response.render('index.html', data);
    } else {
        response.redirect('login');
    }
});

module.exports = router;