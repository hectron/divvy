var divvy = require('../divvy/divvy');

exports.findAll = function(req, res) {
  var data = divvy.requestJSONPromise();
  data.then(function(results){
    res.send(results);
  });
};

exports.findById = function(req, res) {
  res.send({id:req.params.id, name: "The Name", description: "description"});
};

exports.findByCoords = function(req, res){
  res.send({id:1, name:"The Name", description: "description"});
};
