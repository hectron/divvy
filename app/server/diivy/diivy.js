var request = require('request');
url = 'http://divvybikes.com/stations/json';

exports.requestJSON = function(rest)
{
  request({
    url: url,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body) // Print the json response
    }
  });

};

