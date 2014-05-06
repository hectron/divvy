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
    var station = new Divvy.Models.Stations();
});
