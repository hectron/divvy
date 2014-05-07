s/*global Divvy, Backbone*/

Divvy.Models = Divvy.Models || {};

(function() {
    'use strict';

    Divvy.Models.Stations = Backbone.Model.extend({

        url: '',

        initialize: function(obj) {
            var mapWeight = [];
            mapWeight.push(obj.latitude);
            mapWeight.push(obj.longitude);
            mapWeight.push(obj.availableBikes);
            this.attributes.mapWeight = mapWeight;
        },

        defaults: {},

        validate: function(attrs, options) {},

        parse: function(response, options) {
            return response;
        }
    });

})();
