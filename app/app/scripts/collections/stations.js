/*global Divvy, Backbone*/

Divvy.Collections = Divvy.Collections || {};

(function () {
    'use strict';

    Divvy.Collections.Stations = Backbone.Collection.extend({

        model: Divvy.Models.Stations

    });

})();
