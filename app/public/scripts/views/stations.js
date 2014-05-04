/*global Divvy, Backbone, JST*/

Divvy.Views = Divvy.Views || {};

(function () {
    'use strict';

    Divvy.Views.Stations = Backbone.View.extend({

        template: 'app/scripts/templates/stations.ejs',

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
