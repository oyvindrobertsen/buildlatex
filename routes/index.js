var router = require('express').Router();

router.get('', function(req, res) {
    res.render('index.jade');
});

exports.indexRouter = router;
