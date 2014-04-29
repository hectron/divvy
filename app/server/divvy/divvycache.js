var divvy = require('./divvy.js');
var cache = {};
var cache_duration = 1; //in min

exports.update = function(res)
{
  if(!cache || !cache.last_execution){
    console.log('adding to cache');
    cache = {};
    cache.last_execution = new Date(); 
    cache.last_call = res.stationBeanList || res;
  }
};

exports.get = function(deferred){
  return deferred.resolve(cache.last_call);
};

exports.needToMakeRequest = function(){
  if(!cache || !cache.last_execution) return true;

  var difference = Math.abs(new Date() - cache.last_execution);
  var diffDays = Math.round(difference / 86400000); // days
  var diffHrs = Math.round((difference % 86400000) / 3600000); // hours
  var diffMins = Math.round(((difference % 86400000) % 3600000) / 60000); // minutes
  return diffMins >= cache_duration ? true: false;
};


