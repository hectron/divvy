/*global Divvy, Backbone*/

Divvy.Models = Divvy.Models || {};

(function () {
    'use strict';

    Divvy.Models.Stations = Backbone.Model.extend({

        url: '',

        initialize: function() {
          //data is stored into attributes
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
