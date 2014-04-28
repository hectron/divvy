var request = require('request');
var q = require('q');
url = 'http://divvybikes.com/stations/json';


var requestJSON = function(rest, deferred)
{
  console.log('making request');
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      deferred.resolve(body);
    }
  });

};

exports.requestJSONPromise = function(rest)
{
  var deferred = q.defer();
  requestJSON(rest, deferred);
  return deferred.promise;
}
