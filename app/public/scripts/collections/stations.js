/*global Divvy, Backbone*/

Divvy.Collections = Divvy.Collections || {};

(function () {
    'use strict';

    Divvy.Collections.Stations = Backbone.Collection.extend({

        model: Divvy.Models.Stations,
        url: '/json/stations.json',

        parse: function(response, options){
          return response.stationBeanList;
        }
        
       /* sync: function(method, model, options) {
          var self = this;
          var params = _.extend({
            type: 'GET',
            dataType: 'json',
            url: self.url,
            processData: false
          }, options);

          return $.ajax(params);
        }*/

    });

})();
