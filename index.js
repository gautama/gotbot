var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function (request, response) {
    response.send(cool());
});

app.get('/gotbot', function (request, response) {
    response.render('pages/gotbot');
});

app.get('/webhooks', function (request, response) {
  if (request.query['hub.verify_token'] === '<validation_token>') {
    response.send(request.query['hub.challenge']);
  }
  response.send('Error, wrong validation token');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


