var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-3');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

///////OPEN//////////////////
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Dishes.create({
        name: 'Uthapizza8888',
        description: 'Test',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            }
        ]}, 
        
        (err, dish) => {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(() => {
            Dishes.

            findByIdAndUpdate(id, {
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

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);

                        db.collection('dishes').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});

/*
 Connected correctly to server
 Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
 Dish created!
 { __v: 0,
 updatedAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 name: 'Uthapizza8888',
 description: 'Test',
 _id: 57705d553c8d18f30631a057,
 comments:
 [ { updatedAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 rating: 3,
 comment: 'This is insane',
 author: 'Matt Daemon',
 _id: 57705d553c8d18f30631a058 } ] }
 Updated Dish!
 { _id: 57705d553c8d18f30631a057,
 updatedAt: Sun Jun 26 2016 17:55:20 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 name: 'Uthapizza8888',
 description: 'Updated Test',
 __v: 0,
 comments:
 [ { updatedAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 rating: 3,
 comment: 'This is insane',
 author: 'Matt Daemon',
 _id: 57705d553c8d18f30631a058 } ] }
 Updated Comments!
 { _id: 57705d553c8d18f30631a057,
 updatedAt: Sun Jun 26 2016 17:55:20 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 name: 'Uthapizza8888',
 description: 'Updated Test',
 __v: 1,
 comments:
 [ { updatedAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:55:17 GMT-0500 (CDT),
 rating: 3,
 comment: 'This is insane',
 author: 'Matt Daemon',
 _id: 57705d553c8d18f30631a058 },
 { updatedAt: Sun Jun 26 2016 17:55:20 GMT-0500 (CDT),
 createdAt: Sun Jun 26 2016 17:55:20 GMT-0500 (CDT),
 rating: 5,
 comment: 'I\'m getting a sinking feeling!',
 author: 'Leonardo di Carpaccio',
 _id: 57705d583c8d18f30631a059 } ] }
 */