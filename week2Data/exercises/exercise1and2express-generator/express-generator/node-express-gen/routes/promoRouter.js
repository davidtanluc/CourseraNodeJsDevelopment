module.exports = function (app) {

    app.all('/promotions', function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })

    app.get('/promotions', function (req, res, next) {
        res.end('Will send all the promotions to you!');
    })

    app.post('/promotions', function (req, res, next) {
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    })

    app.delete('/promotions', function (req, res, next) {
        res.end('Deleting all promotions');
    });

    app.all('/promotions/:promotionId', function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })

    app.get('/promotions/:promotionId', function (req, res, next) {
        res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you!');
    })

    app.put('/promotions/:promotionId', function (req, res, next) {
        res.write('Updating the promotion: ' + req.params.promotionId + '\n');
        res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    })

    app.delete('/promotions/:promotionId', function (req, res, next) {
        res.end('Deleting promotion: ' + req.params.promotionId);
    });

}