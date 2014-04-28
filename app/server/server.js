var express = require('express'),
    routes = require('./routes/stations'),
    divvy = require('./divvy/divvy');
var app = express();

var data = divvy.requestJSONPromise();

data.then(function(results){
  results = results.stationBeanList;
  console.log(results.length);
});

app.get('/stations', routes.findAll);
app.get('/stations/:id', routes.findById);

app.listen(8080);
console.log('Listening on port 3000...');
