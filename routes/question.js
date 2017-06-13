/**
 * Created by adrianjez on 13.06.2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
var Questions = require('../domain/questionSchema').Questions;
var Mailer = require('./../custom_modules/Mailer');

/**
 * GET
 * Returns question ask form
 */
router.get('/', function (req, res, next) {
    var body = req;
    body.title = "Feedback";
    res.render('pages/question', body)
});

/**
 * POST
 * Is responsible for sending questions and displaying message if success
 */
router.post('/', urlencodedParser, function (req, res) {
    var data = req.body;
    data.date = new Date();
    console.log(data);
    Questions.create(data, function (err, doc) {
        if (err) return next(err);
        var mailOptions = Mailer.mailOptions;
        mailOptions.subject = data.subject;
        mailOptions.text = data.message;
        mailOptions.from = data.email;
        mailOptions.to = 'adrian98985@gmail.com';
        Mailer.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.send('Wiadomość ' + info.messageId + ' wysłana: ' + info.response);
        });
        res.render('info', {message: "Question has been sent", user: req.user});
    });
});

module.exports = router;