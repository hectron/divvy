var express = require('express'),
    stations = require('./routes/stations');
var app = express();

app.get('/stations', stations.findAll);
app.get('/stations/:id', stations.findById);

app.listen(8080);
console.log('Listening on port 8080...');
