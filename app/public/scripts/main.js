/*global Divvy, $*/

window.Divvy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: window.AppRouter,
  init: function () {
    'use strict';
    console.log('Hello from Backbone!');
  }
};

$(document).ready(function () {
  'use strict';
  Divvy.init();
  
  var map = new Divvy.Map();
  map.initialize();
  var stations = new Divvy.Collections.Stations(map.addStationsToMap);

  $(window).scroll(function() {
    if (jQuery(this).scrollTop() > offset) {
      $('.rightrail').fadeIn(duration);
    } else {
      $('.rightrail').fadeOut(duration);
    }
  });

});
