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
    // create a new dish
    Dishes.create({
        name: 'Uthapizza555',
        description: 'Test'
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    db.collection('dishes').drop(function () {
                        db.close();
                    });
                });
        }, 3000);
    });
});

/*
 Connected correctly to server
 Dish created!
 { __v: 0,
 updatedAt: Sun Jun 26 2016 17:53:30 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:53:30 GMT-0500 (CDT),
 name: 'Uthapizza555',
 description: 'Test',
 _id: 57705cea09b29fe4067a68cc }
 Updated Dish!
 { _id: 57705cea09b29fe4067a68cc,
 updatedAt: Sun Jun 26 2016 17:53:33 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:53:30 GMT-0500 (CDT),
 name: 'Uthapizza555',
 description: 'Updated Test',
 __v: 0 }

 Process finished with exit code 0
 */