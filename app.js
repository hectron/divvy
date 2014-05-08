var express = require('express'),
stations = require('./server/routes/stations'),
path = require('path');

var app = express();

var public = path.resolve('app/public');
app.set('base', public);

app.get('/ping', function() {
  res.send('pong');
});

app.get('/json/stations', stations.findAll);
app.get('/stations/:id', stations.findById);
app.get('/', function(req, res) {
  var indexPath = path.resolve(public, 'index.html');
  res.sendfile(indexPath);
});

app.use(express.static(public));

/**
 * Error handling
 */

// any url not configured, send 404
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;

  next(err);
});

app.use(function(err, req, res, next) {
  if (err.status !== 404)
    return next();

  var errorPath = path.resolve(public, '404.html');

  res.sendfile(errorPath, err);
});

var port = process.env.PORT || 8001;
app.listen(port);

console.log('Listening on port: ' + port);
