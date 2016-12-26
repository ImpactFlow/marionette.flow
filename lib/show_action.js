'use strict';

var assertWith = require('./assert_with');
var Flow = require('flow');

var MarionetteShowAction = Flow.Action.extend({
    initialize: function (options) {
        assertWith(options).expectProperty('region', 'FlowAadapter requires a region');
        this.region = options.region;
        this.listenToView();
    },

    listenToView: function () {
        this.payload.on('next', this.next.bind(this));
    },

    start: function () {
        this.region.show(this.payload);
    },
});

module.exports = MarionetteShowAction;
