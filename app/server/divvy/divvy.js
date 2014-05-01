var request = require('request');
var divvyCache = require('./divvycache.js');
var q = require('q');
var url = 'http://divvybikes.com/stations/json';

var requestJSON = function(deferred)
{
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      divvyCache.update(body);
      deferred.resolve(body);
    }
  });

};

var requestJSONPromise = function()
{
  var deferred = q.defer();
  if(divvyCache.needToMakeRequest()){
    requestJSON(deferred);
  }else{
    divvyCache.get(deferred);
  }
  return deferred.promise;
}

var massageStationList = function(data)
{
  return data && data.stationBeanList ? 
    data.stationBeanList : data;
}

exports.allStations = function(req, res)
{
  var promise = requestJSONPromise();
  promise.then(function(stationList){
    return res.send(massageStationList(stationList));
  });
}

exports.stationById = function(req, res)
{
  var data = requestJSONPromise(),
    targetId = req.params.id,
    stations = [], station;

  data.then(function (results) {
    stations = massageStationList(results);

    for (var i = 0, size = stations.length; !station && i < size; i++) {
      if (targetId == stations[i].id) {
        station = stations[i];
      }
    }
    return res.send(station);
  });
}