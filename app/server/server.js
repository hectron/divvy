var express = require('express'),
    routes = require('./routes/stations'),
    diivy = require('./diivy/diivy');
var app = express();

diivy.requestJSON();

app.get('/stations', routes.findAll);
app.get('/stations/:id', routes.findById);

app.listen(3000);
console.log('Listening on port 3000...');
