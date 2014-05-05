var request = require('request'),
  divvyCache = require('./divvycache.js'),
  q = require('q');

var url = 'http://divvybikes.com/stations/json';

var requestJSON = function (deferred) {
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      divvyCache.update(body);
      deferred.resolve(body);
    } else if (error || response.statusCode === 404) {
      console.log('An error has occured in server/divvy/divvy.js');
    }
  });

};

var requestJSONPromise = function() {
  var deferred = q.defer();

  if (divvyCache.needToMakeRequest()) {
    requestJSON(deferred);
  } else {
    divvyCache.get(deferred);
  }

  return deferred.promise;
};

var massageStationList = function (data) {
  return data && data.stationBeanList ?
    data.stationBeanList : data;
};

exports.allStations = function(req, res) {
  var promise = requestJSONPromise();
  promise.then(function(stationList){
    return res.send(massageStationList(stationList));
  });
};

exports.stationById = function(req, res) {
  var data = requestJSONPromise(),
    targetId = req.params.id;

  data.then(function (results) {
    var stations = massageStationList(results),
      station = getStationByAttr(stations, 'id', targetId);

    return res.send(station);
  });
};

exports.stationByCoords = function (req, res) {
  var data = requestJSONPromise();

  data.then(function (results) {
    var stations = massageStationList(results),
      station = getStationByCoordinates(stations, req.params.lat, req.params.lon);

    return res.send(station);
  });
};

var getStationByAttr = function (stations, attribute, attributeValue) {
  var station;
  for (var i = 0, size = stations.length; !station && i < size; i++) {
    if (stations[i].hasOwnProperty(attribute) && stations[i][attribute] == attributeValue) {
      station = stations[i];
    }
  }
  return station;
};

var getStationByCoordinates = function (stations, latitude, longitude) {
  var station;
  for (var i = 0, size = stations.length; !station && i < size; i++) {
    if (stations[i].latitude == latitude && stations[i].longitude == longitude) {
      station = stations[i];
    }
  }
  return station;
};
