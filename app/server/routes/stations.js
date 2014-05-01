var divvy = require('../divvy/divvy');

exports.findAll = function(req, res) {
  divvy.allStations(req, res);
};

exports.findById = function(req, res) {
  divvy.stationById(req, res);
};

exports.findByCoords = function(req, res){
  res.send({id:1, name:"The Name", description: "description"});
};
