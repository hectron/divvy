Divvy.Map = Divvy.Map || {};
Divvy.Map = function(){
  var self = this;
  this.map = {};

  this.initialize = function(){
    var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/westeezy.i61hfle6/{z}/{x}/{y}.png', {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });
    self.map = L.map('map').addLayer(mapboxTiles).setView([41.8847302006, -87.6277335692], 14);
    L.control.locate({drawCircle:false}).addTo(self.map);
    setUpEventListeners();
  };

  this.instance = function(){
    return self.map;
  };

  this.addStationsToMap = function(collection, resp, xhr){
    collection.each(function(model){
      var attrs = model.attributes;
      var message = self.formatMessage(attrs);
      var coords = [];
      coords.push(attrs.latitude)
      coords.push(attrs.longitude);
      self.createMapCircle(coords, message);
    });
  };

  this.createMapCircle = function(coords, message){
    var circle = L.circle(coords, 10, {
      color: '#2FCAFC',
      fillColor: '#2FCAFC',
      fillOpacity: 1.0
    }).addTo(self.map);

    circle.bindPopup(message);
  };

  this.formatMessage = function(attrs){
    var message = "<h3>" + attrs.stAddress1 + "</h3><br /><b>" + "avail: </b>" + attrs.availableBikes;
    return message;
  };

  var setUpEventListeners = function(){
    $('.center-map').click(function(event){
      self.map.panTo(new L.LatLng(41.8847302006, -87.6277335692));
      self.map.setZoom(14);
    });

    $('.heat-map').click(function(event){
      alert('no');
    });

    $('.back-to-top').click(function(event) {
      var offset = 800;
      var duration = 500;
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, duration);
      return false;
    });
  };
};

