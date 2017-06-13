var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req);
    var body = req;
    body.title = 'Start';

    res.render('content', body);
});

module.exports = router;
