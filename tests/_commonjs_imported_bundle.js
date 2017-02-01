'use strict';

var Flow = require('flow');

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
});
