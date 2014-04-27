var express = require('express'),
    routes = require('./routes/stations'),
    divvy = require('./divvy/divvy');
var app = express();

divvy.requestJSON();

app.get('/stations', routes.findAll);
app.get('/stations/:id', routes.findById);

app.listen(3000);
console.log('Listening on port 3000...');
