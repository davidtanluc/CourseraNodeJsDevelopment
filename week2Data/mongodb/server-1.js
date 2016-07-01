var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    var newDish = Dishes({
        name: 'Uthapizza44',
        description: 'Test'
    });

    // save the user
    newDish.save(function (err) {
        if (err) throw err;
        console.log('Dish created!');

        // get all the users
        Dishes.find({}, function (err, dishes) {
            if (err) throw err;

            // object of all the users
            console.log(dishes);
            db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });
});
/*
 Connected correctly to server
 Dish created!
 [ { _id: 57705c978f56159306e6cc1d,
 updatedAt: Sun Jun 26 2016 17:52:07 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:52:07 GMT-0500 (CDT),
 name: 'Uthapizza33',
 description: 'Test',
 __v: 0 } ]
 */