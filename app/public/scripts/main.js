/*global Divvy, $*/

window.Divvy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: window.AppRouter,
  init: function() {
    'use strict';
    console.log('Hello from Backbone!');
  }
};

$(document).ready(function() {
  'use strict';
  Divvy.init();

  var map = new Divvy.Map();
  map.initialize();
  var stations = new Divvy.Collections.Stations(map.addStationsToMap);
  
  map.map.on('locationfound', function(results){
    var latitude = results.latitude;
    var longitude = results.longitude;
    console.log(latitude + " : " + longitude);
  }, self);

  var offset = 600;
  var duration = 500;
  $(window).scroll(function() {
    if (jQuery(this).scrollTop() > offset) {
      $('.rail').fadeIn(duration);
    } else {
      $('.rail').fadeOut(duration);
    }
  });

});
