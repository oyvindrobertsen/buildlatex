var Router = require('express').Router;

var router = Router();

router.get('', function(req, res) {
    res.render('index.jade');
});

exports.indexRouter = router;
