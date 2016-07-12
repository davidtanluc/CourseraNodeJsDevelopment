var express = require('express');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var Verify    = require('./verify');
var Dishes = require('../models/dishes');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Dishes.find({})
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if (err) throw err;
                res.json(dish);
            });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        Dishes.create(req.body, function (err, dish) {
            if (err) throw err;
            console.log('Dish created!');
            var id = dish._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
    
            res.end('Added the dish with id: ' + id);
        });
    })
    
    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Dishes.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = dishRouter;