'use strict';

var _ = require('underscore');
var assertWith = require('./assert_with');
var Flow = require('flow');
var ShowAction = require('./show_action');

var MarionetteFlowBuilder = Flow.Builder.extend({
    initialize: function (options) {
        assertWith(options).expectProperty('region', 'MarionetteFlowBuilder requires a region');
        var region = options.region;

        this.addActionBuilder(function (flow, payload) {
            return new ShowAction({
                flow: flow,
                payload: payload.viewFn(),
                region: region,
            });
        });
    },

    addView: function (viewFn, nameOrOptions) {
        var options = _.isString(nameOrOptions) ? { name: nameOrOptions} : nameOrOptions;
        assertWith(options).expectProperty('name', 'MarionetteFlowBuilder addView requires a name');
        var payload = _.extend(options, { viewFn: viewFn });
        return this.addVertex(options, payload);
    },

    startAtView: function (sourceViewName) {
        return this.startAtVertex(sourceViewName);
    },
});

module.exports = MarionetteFlowBuilder;
