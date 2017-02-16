'use strict';

var assertWith = require('./assert_with');
var Flow = require('flow');

var MarionetteShowAction = Flow.Action.extend({
    initialize: function (options) {
        assertWith(options).expectProperty('region', 'FlowAadapter requires a region');
        this.region = options.region;
    },

    listenToView: function (view) {
        view.on('next', function () {
            view.off('next');
            this.next.apply(this, arguments);
        }.bind(this));
    },

    start: function (viewBuilder) {
        var view = viewBuilder();
        this.listenToView(view);
        this.region.show(view);
    },
});

module.exports = MarionetteShowAction;
