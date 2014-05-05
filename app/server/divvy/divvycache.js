var divvy = require('./divvy.js');

var cache;
var CACHE_DURATION = 1; // in min

var inCache = function () {
  return cache && cache.last_execution;
};

exports.update = function(res) {
  if(!inCache()) {
    console.log('adding to cache');
    cache = {
      'last_execution': new Date(),
      'last_call': res.stationBeanList || res
    };
  }
};

exports.get = function(deferred){
  return deferred.resolve(cache.last_call);
};

exports.needToMakeRequest = function(){
  if(!inCache()) return true;

  var difference = Math.abs(new Date() - cache.last_execution);
  var diffDays = Math.round(difference / 86400000); // days
  var diffHrs = Math.round((difference % 86400000) / 3600000); // hours
  var diffMins = Math.round(((difference % 86400000) % 3600000) / 60000); // minutes

  return diffMins >= CACHE_DURATION;
};


