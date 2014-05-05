var express = require('express'),
    stations = require('./routes/stations'),
    path = require('path');

var app = express();

var public = path.resolve('app', 'public');
app.set('base', public);

app.get('/stations', stations.findAll);
app.get('/stations/:id', stations.findById);
app.get('/', function(req, res){
   var indexPath = path.resolve(public, 'index.html');
   res.sendfile(indexPath);
});

/*
 * TODO: Fix paths in file system. This is wonky below
 */
app.use(express.static(public));
app.listen(8080);
console.log('Listening on port 8080...');
