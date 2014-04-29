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

exports.requestJSONPromise = function()
{
  var deferred = q.defer();
  if(divvyCache.needToMakeRequest()){
    requestJSON(deferred);
  }else{
    divvyCache.get(deferred);
  }
  return deferred.promise;
}
