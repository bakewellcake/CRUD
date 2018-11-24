var express = require('express')
var validate = require('express-validation')
var joi = require('joi')
var db = require('../database')

var op = db.driver.Op

var router = express.Router()

router.get('/', function(req, res, next) {    
    res.render('index')
})

// fetch all beers
router.get('/beers', function (req, res, next) {
    db.beer.findAll().then(function (data) {
        res.json(data)
    }).catch(error => next(error))
})

// add new beer
router.post('/beers', validate({
    body: {
        name: joi.string().required().max(128),
        company: joi.string().required().max(128),
        style: joi.string().required().max(128),
        percentage: joi.number().required().max(100),
        rating: joi.number().required().max(5)
    }
}), function (req, res, next) {
    db.beer.create(req.body).then(function (data) {
        res.json(data)
    }).catch(error => next(error))
})

// search beer
router.get('/beers/:beerName', function (req, res, next) {
    db.beer.findAll({
        where: {
            name: {
                [op.iLike]: '%' + req.params.beerName + '%'
            }
        }
    }).then(function (data) {
        res.json(data)
    }).catch(error => next(error))
})

// edit beer
router.put('/beers/:beerID', function (req, res, next) {
    db.beer.update(req.body, {
        where: {
            id: req.params.beerID
        }
    }).then(function () {
        res.sendStatus(200)
    }).catch(error => next(error))
})

// delete beer
router.delete('/beers/:beerID', function (req, res, next) {
    db.beer.destroy({
        where:{
            id: req.params.beerID
        }
    }).then(function () {
        res.sendStatus(200)
    }).catch(error => next(error))
})

module.exports = router