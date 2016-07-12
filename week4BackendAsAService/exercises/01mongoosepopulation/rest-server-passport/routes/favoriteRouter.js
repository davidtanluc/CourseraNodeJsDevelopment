var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({postedBy: req.decoded._doc._id})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    var ispresent = null;
    Favorites.findOne({postedBy:req.decoded._doc._id}, function (err, favorite) {
        if (err) throw err;
        ispresent = favorite;
        if(!ispresent) {
            Favorites.create({postedBy:req.decoded._doc._id}, function (err, favorite1) {
                if (err) throw err;
                ispresent = favorite1;
                ispresent.dishes.push(req.body);
                ispresent.save(function (err, ispresent) {
                    if (err) throw err;
                    res.json(ispresent);
                });
            });
        }
        else {
            ispresent.dishes.push(req.body);
            ispresent.save(function (err, ispresent) {
                if (err) throw err;
                res.json(ispresent);
            }); 
        }
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findByIdAndRemove({postedBy:req.decoded._doc._id}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:favoriteId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findById(req.params.favoriteId)
        .populate('comments.postedBy')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Favorites.findByIdAndUpdate(req.params.favoriteId, {
        $set: req.body
    }, {
        new: true
    }, function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOne({postedBy:req.decoded._doc._id})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) throw err;
        if(!favorite) {
            var err = new Error('This dish is not a favorite');
            err.status = 403;
            return next(err);
        }
        var dishes = favorite.dishes;
        dishes.forEach(function(dish, index) {
            if(dish._id == favoriteId) {
                dishes.remove(dish);
                return;
            }
        });
        favorite.save(req.params.favoriteId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = favoriteRouter;