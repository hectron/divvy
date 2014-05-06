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

  // var map = L.map('map').setView([41.8847302006, -87.6277335692], 14);
  /* L.tileLayer('http://{s}.tile.cloudmade.com/2a8add9297b944d8bf422f516c7716c2/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(map);
  */

  var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/westeezy.i61hfle6/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  });
  var map = L.map('map').addLayer(mapboxTiles).setView([41.8847302006, -87.6277335692], 14);
  L.control.locate().addTo(map);


  var createMapCircle = function(coords, message){
    var circle = L.circle(coords, 10, {
      color: '#2FCAFC',
      fillColor: '#2FCAFC',
      fillOpacity: 1.0
    }).addTo(map);

    circle.bindPopup(message);
  };

  var formatMessage = function(attrs){
    var message = "<h3>" + attrs.stAddress1 + "</h3><br /><b>" + "avail: </b>" + attrs.availableBikes;

    return message;
  };

  var addStationsToMap = function(collection, resp, xhr){
    collection.each(function(model){
      var attrs = model.attributes;
      var message = formatMessage(attrs);
      var coords = [];
      coords.push(attrs.latitude)
      coords.push(attrs.longitude);
      createMapCircle(coords, message);
    });
  };

  var stations = new Divvy.Collections.Stations(addStationsToMap);
  var offset = 800;
  var duration = 500;

  $(window).scroll(function() {
    if (jQuery(this).scrollTop() > offset) {
      $('.rightrail').fadeIn(duration);
    } else {
      $('.rightrail').fadeOut(duration);
    }
  });

  $('.back-to-top').click(function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, duration);
    return false;
  })
});
