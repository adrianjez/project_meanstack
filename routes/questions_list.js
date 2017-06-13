/**
 * Created by adrianjez on 13.06.2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
var Questions = require('../domain/questionSchema').Questions;

router.get('/', checkAuthentication, function (req, res, next) {
    Questions.find({}, function (err, qstns) {
        if (err) return next(err);
        req.title = "Questions";
        req.questions = qstns;
        res.render('pages/questions-list', req);
    });

});
router.get('/list', checkAuthentication, function (req, res, next) {
    Questions.find({}, function (err, qstns) {
        if (err) return next(err);
        res.send(qstns);
    });

});

router.get('/read/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    Questions.findById(req.params.id, function (err, qstn) {
        if (err) return next(err);
        qstn.read = !qstn.read;
        qstn.save(function (err) {
            if (err)
                console.log(err);
            res.redirect('/questions');
        });

    });

});
router.get('/detail/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    Questions.findById(req.params.id, function (err, qstn) {
        if (err) return next(err);
        res.send(qstn);
    });

});
router.get('/delete/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    Questions.findByIdAndRemove(req.params.id, function (err, qstn) {
        if (err) return next(err);
        res.redirect('/questions');

    });

});
router.delete('/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    Questions.findByIdAndRemove(req.params.id, function (err, qstn) {
        if (err) return next(err);
        res.send("Question has been deleted successfully");
    });

});


function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("../users/login");
    }
}
module.exports = router;