var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    dboper.insertDocument(db,
        { name: "Vadonut07-01", description: "Testc2" },
        "dishes",

        function (result) {
            console.log(result.ops);

            dboper.findDocuments(db, "dishes", function (docs) {
                console.log(docs);

                dboper.updateDocument(db,
                    { name: "Vadonut07-01" },
                    { description: "Updated Test07-01" },
                    "dishes",

                    function (result) {
                        console.log("#Updated results", result.result);

                        dboper.findDocuments(db, "dishes", function (docs) {
                            console.log(docs)

                            db.dropCollection("dishes", function (result) {
                                console.log(result);

                                db.close();
                            });
                        });
                    });
            });
        });
});

/*
 Connected correctly to server
 Inserted 1 documents into the document collection dishes
 [ { name: 'Vadonut2',
 description: 'Testc2',
 _id: 57705bb6df03fe63061b6d1d } ]
 [ { _id: 57705bb6df03fe63061b6d1d,
 name: 'Vadonut2',
 description: 'Testc2' } ]
 Updated the document with [object Object]
 { ok: 1, nModified: 1, n: 1 }
 [ { _id: 57705bb6df03fe63061b6d1d,
 name: 'Vadonut2',
 description: 'Updated Test' } ]
 null

 /////

 Connected correctly to server
 Inserted 1 documents into the document collection dishes
 [ { name: 'Vadonut07-01',
 description: 'Testc2',
 _id: 5776e08efdfb1c36362fc455 } ]
 [ { _id: 5776e08efdfb1c36362fc455,
 name: 'Vadonut07-01',
 description: 'Testc2' } ]
 Updated the document with [object Object]
 #Updated results { ok: 1, nModified: 1, n: 1 }
 [ { _id: 5776e08efdfb1c36362fc455,
 name: 'Vadonut07-01',
 description: 'Updated Test07-01' } ]
 null
 */