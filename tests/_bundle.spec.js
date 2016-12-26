'use strict';

var Flow = require('flow');
var Marionette = require('backbone.marionette');

describe('marionette.flow', function () {
    var exported = require('../marionette.flow');

    it('should define Flow.Action.ShowAction', function () {
        expect(Flow.Action.ShowAction).toBeDefined();
    });

    it('should define Flow.Builder.MarionetteBuilder', function () {
        expect(Flow.Builder.MarionetteBuilder).toBeDefined();
    });

    it('should define Marionette.FlowBuilder', function () {
        expect(Marionette.FlowBuilder).toBeDefined();
        expect(Marionette.FlowBuilder).toEqual(Flow.Builder.MarionetteBuilder);
    });

    it('should export Marionette', function () {
        expect(exported).toEqual(Marionette);
    });
});
