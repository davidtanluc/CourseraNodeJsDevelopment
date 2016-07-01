function Leader(app) {

    app.all('/leadership', function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })

    app.get('/leadership', function (req, res, next) {
        res.end('Will send all the leaders to you!');
    })

    app.post('/leadership', function (req, res, next) {
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })

    app.delete('/leadership', function (req, res, next) {
        res.end('Deleting all leaders');
    });

    app.all('/leadership/:leaderId', function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })

    app.get('/leadership/:leaderId', function (req, res, next) {
        res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
    })

    app.put('/leadership/:leaderId', function (req, res, next) {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })

    app.delete('/leadership/:leaderId', function (req, res, next) {
        res.end('Deleting leader: ' + req.params.leaderId);
    });

}

module.exports = Leader