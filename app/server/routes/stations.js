var divvy = require('../divvy/divvy');

exports.findAll = function(req, res) {
  var data = divvy.requestJSONPromise();
  data.then(function(results){
    res.send(results);
  });
};

exports.findById = function(req, res) {
  var data = divvy.requestJSONPromise(),
    targetId = req.params.id,
    stations = [], station;

  data.then(function (results) {
    stations = cleanResults(results);

    for (var i = 0, size = stations.length; !station && i < size; i++) {
      if (targetId == stations[i].id) {
        station = stations[i];
      }
    }

    // check if the station is found
    // otherwise send an error message
    res.send(station);
  });


};

exports.findByCoords = function(req, res){
  res.send({id:1, name:"The Name", description: "description"});
};

var cleanResults = function (divvyJson) {
  divvyJson = divvyJson || {};
  // the cache does not have the stationBeanList
  return divvyJson.length ? divvyJson : divvyJson['stationBeanList'];
};
