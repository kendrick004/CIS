var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
    if(request.session.login) {
        // var data = {};
        // response.render('index.html', data);

        /* no dashboard yet, so redirect to project page for the mean time */
        response.redirect('project');
    } else {
        response.redirect('login');
    }
});

module.exports = router;