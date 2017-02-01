'use strict';

var Flow = require('flow');
var Marionette = require('backbone.marionette');

window.Marionette = Marionette;

describe('marionette.flow', function () {
    var exported = require('../marionette.flow');

    it('should define Flow.Action.ShowAction', function () {
        expect(Flow.Action.ShowAction).toBeDefined();
    });

    it('should define Flow.Builder.MarionetteBuilder', function () {
        expect(Flow.Builder.MarionetteBuilder).toBeDefined();
    });

    it('should export Marionette', function () {
        expect(exported).toEqual(Flow);
    });

    it('should define Marionette.FlowBuilder if Marionette is defined globally', function () {
        expect(Marionette.FlowBuilder).toBeDefined();
        expect(Marionette.FlowBuilder).toEqual(Flow.Builder.MarionetteBuilder);
    });
});
