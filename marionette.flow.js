'use strict';

var Flow = require('flow');
var Marionette = require('backbone.marionette');

Flow.Action.ShowAction = require('./lib/show_action');
Flow.Builder.MarionetteBuilder = require('./lib/marionette_builder');

Marionette.FlowBuilder = Flow.Builder.MarionetteBuilder;

module.exports = Marionette;
