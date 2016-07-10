var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
    console.log("Connected correctly to server");
    var collection = db.collection("dishes");

    //////////// INSERT //////////////////////////////////////////////////////////
    collection.insertOne({name: "Uthapizza2", description: "test 2"}, function(err,result){
        assert.equal(err,null);
        console.log("After Insert:");
        console.log(result.ops);
        collection.find({}).toArray(function(err,docs){
            assert.equal(err,null);
            console.log("Found:");
            console.log(docs);
            db.dropCollection("dishes", function(err, result){
                assert.equal(err,null);
                db.close();
            });
        });
    });
});

/*
 Connected correctly to server
 After Insert:
 [ { name: 'Uthapizza2',
 description: 'test 2',
 _id: 57705b2afb59d541062011e7 } ]
 Found:
 [ { _id: 577046d4916b55af81558e33,
 name: 'Uthapizza',
 description: 'Test' },
 { _id: 57705b2afb59d541062011e7,
 name: 'Uthapizza2',
 description: 'test 2' } ]
 */