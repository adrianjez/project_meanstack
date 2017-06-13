/**
 * Created by adrianjez on 13.06.2017.
 */
var express = require('express');
var router = express.Router();
var Animals = require('../domain/animalSchema').Animals;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});

router.get('/', checkAuthentication, function (req, res, next) {
    Animals.find({}, function (err, animals) {
        req.animals = animals;
        req.title = "Added Animals";
        res.render('pages/animal-list', req)
    });
});

router.get('/list', checkAuthentication, function (req, res, next) {
    Animals.find({}, function (err, animals) {
        res.send(animals);
    });
});
router.get('/add', checkAuthentication, function (req, res, next) {
    req.title = "Create animal";
    res.render('pages/animal-add', req)
});

router.post('/add', function (req, res, next) {
    Animals.create(req.body, function (err, doc) {
        if (err) return next(err);
        else {
            req.title = "Animal";
            req.message = doc.name + " has been added";
            res.render('info', req)
        }
    });
});

router.get('/detail/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    Animals.findById(req.params.id, {
        category: true,
        name: true,
        title: "",
        description: "",
        active: true,
        photo: ""
    }, function (err, animal) {
        if (err) return next(err);
        res.send(animal);
    })
});
router.get('/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    Animals.findById(req.params.id, {
        category: true,
        name: true,
        title: "",
        description: "",
        active: true,
        photo: ""
    }, function (err, animal) {
        if (err) return next(err);
        req.animal = animal;
        res.render('pages/animal-update', req);
    })
});
router.post('/update/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    Animals.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        if (err) return next(err);
        req.title = "Animal";
        req.message = doc.name + " has been updated";
        res.render('info', req)
    });
});
router.put('/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    Animals.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        if (err) return next(err);
        req.title = "Animal";
        req.message = doc.name + " has been updated";
        res.render('info', req)
    });
});

router.get('/delete/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    console.log("Test");
    Animals.findByIdAndRemove(req.params.id, function (err, doc) {
        if (err) return next(err);
        req.message = doc.name + " has been deleted";
        req.title = "Animal";
        res.render('info', req)
    });
});
router.delete('/:id', checkAuthentication, urlencodedParser, function (req, res, next) {
    Animals.findByIdAndRemove(req.params.id, function (err, doc) {
        if (err) return next(err);
        req.message = doc.name + " has been deleted";
        req.title = "Animal";
        res.render('info', req)
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
