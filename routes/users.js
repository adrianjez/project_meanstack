var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
var Users = require('./../domain/userSchema').Users;
var sha1 = require('sha1');
var mailer = require('./../custom_modules/Mailer');
var passport = require('passport');

/* GET . */
router.get('/', function (req, res, next) {
    res.render('info', {title: "User Module", message: "Witaj w module users", user: req.user});
});

router.get('/login', function (req, res, next) {
    res.render('pages/login', {title: "Login", user: req.user});
});

router.post('/login',
    passport.authenticate('local',
        {
            session: true,
            successRedirect: '../',
            failureRedirect: '/users/niezalogowany'
        })
);
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
router.get('/niezalogowany', function (req, res, next) {
    var data = {
        title: "Login message",
        message: "Wrong login data or your account is still inactive.",
        link: "login"
    };
    res.render('info', data);
})

/* GET User create form*/
router.get('/register', function (req, res, next) {
    res.render('pages/register', {title: "Register"});
});
/* POST Create User*/
router.post('/register', urlencodedParser, function (req, res, next) {
    if (!req.body.username || !req.body.password || !req.body.confirm_password ||
        req.body.password !== req.body.confirm_password || !req.body.email) {
        res.render('info', {
            title: "Register message",
            message: "Register Unsuccesfull", error: {
                status: "Brakuje danych w polach username,email," +
                " password, confirm password lub podane hasła nie pasują "
            },
            link: "register"
        });

    } else {
        var data = req.body;
        data.admin = true;
        data.active = true;
        data.password = sha1(data.password);
        Users.create(data, function (err, doc) {
            console.log("Users.create" + err);
            if (err) return next(err);

            var link = 'https://secure-castle-82591.herokuapp.com/users/activate/' + doc.id;
            var mailOptions = mailer.mailOptions;
            mailOptions.subject = 'Aktywuj swoje konto!';
            mailOptions.html = '<a href="' + link + '">Click to activate! :) </a>';
            mailOptions.to = doc.email;
            mailer.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error: after mailer.transporter.sendMail " + error);
                    return console.log(error);
                }
                res.send('Wiadomość ' + info.messageId + ' wysłana: ' + info.response);
            });
            console.log("Going to render registered");
        });
        res.render('info', {
            title: "Register message",
            message: "Register Succesfull",
            error: {status: "Na twój email została wysłana wiadomość z aktywacyjnym linkiem"}
        });

    }
});
router.get('/activate/:id', function (req, res, next) {
    Users.findByIdAndUpdate(req.params.id, {active: true}, function (err, doc) {
        if (err) return next(err);
        let text = "Account " + doc.username + " has been activated";
        res.render('info', {title: "Activation", message: "Activation Succesfull", error: {status: text}});
    });
});
module.exports = router;
