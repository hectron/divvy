var express = require('express'),
    stations = require('./routes/stations'),
    path = require('path');

var app = express();

var public = path.resolve('public');
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

app.listen(8001);
console.log('Listening on port 8080...');
