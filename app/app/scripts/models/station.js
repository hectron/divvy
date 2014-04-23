/*global Divvy, Backbone*/

Divvy.Models = Divvy.Models || {};

(function () {
    'use strict';

    Divvy.Models.Station = Backbone.Model.extend({

        url: '',

        initialize: function() {
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
