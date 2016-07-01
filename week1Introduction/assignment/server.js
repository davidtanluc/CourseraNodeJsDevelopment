var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

///// ROUTES ////////////////////
require('./routes/dishRouter')(app);
require('./routes/promoRouter')(app);
require('./routes/leaderRouter')(app);

///// PATHS/////////////////////////
app.use(express.static(__dirname + '/public'));

////// PORT NUMBER //////////////////
app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});