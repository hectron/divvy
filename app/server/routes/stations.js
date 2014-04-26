exports.findAll = function(req, res) {
  res.send([{name:'station1'}, {name:'station2'}, {name:'station3'}]);
};

exports.findById = function(req, res) {
  res.send({id:req.params.id, name: "The Name", description: "description"});
};

exports.findByCoords = function(req, res){
  res.send({id:1, name:"The Name", description: "description"});
};
