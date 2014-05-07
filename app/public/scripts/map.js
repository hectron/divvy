Divvy.Map = Divvy.Map || {};
Divvy.Map = function(){
  var self = this;
  var heatMapEnabled = false;
  this.map = {};
  this.mapWeights = [];

  this.initialize = function(){
    self.mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/westeezy.i61hfle6/{z}/{x}/{y}.png', {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });
    self.heatmap = new L.TileLayer.WebGLHeatMap({size: 1000, autoresize: true, opacity: 0.5}); 
    self.map = L.map('map').addLayer(self.mapboxTiles).setView([41.8847302006, -87.6277335692], 14);
    L.control.locate({drawCircle:false}).addTo(self.map);
    setUpEventListeners();
  };

  this.instance = function(){
    return self.map;
  };

  this.addHeatMap = function(){
    if(self.heatmap){
      self.map.addLayer(self.heatmap);
      heatMapEnabled = true;
    }
  };

  this.removeHeatMap = function(){
    self.map.removeLayer(self.heatmap);
    heatMapEnabled = false;
  };

  this.addStationsToMap = function(collection, resp, xhr){
    collection.each(function(model){
      var attrs = model.attributes;
      var message = self.formatMessage(attrs);
      var coords = [];
      coords.push(attrs.latitude)
      coords.push(attrs.longitude);
      self.createMapCircle(coords, message);
      var lat = parseFloat(attrs.latitude);
      var lng = parseFloat(attrs.longitude);
      if (!(isNaN(lat) || isNaN(lng))) {
        self.heatmap.addDataPoint(lat, lng, Math.abs(attrs.availableBikes - attrs.totalDocks));
      }
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
      if(heatMapEnabled)
        self.removeHeatMap();
      else
        self.addHeatMap();
    });

    $('.back-to-top').click(function(event) {
      var duration = 500;
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, duration);
      return false;
    });
  };
};

