'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var ShowAction = require('../lib/show_action');

describe('show_action', function () {
    var adapter;
    var flow;
    var payload;
    var region;

    var assertNextBehavior = function () {
        it('should call next on the passed flow', function () {
            expect(flow.next).toHaveBeenCalled();
        });
    };

    beforeEach(function () {
        Backbone.$ = $;
        flow = {
            next: jasmine.createSpy(),
        };
        payload = new Marionette.View();
        region = new Marionette.Region({
            el: document.createElement('div'),
        });
        adapter = new ShowAction({
            flow: flow,
            payload: payload,
            region: region,
        });
    });

    it('should exist', function () {
        expect(adapter).toBeDefined();
    });

    describe('when calling next', function () {
        beforeEach(function () {
            adapter.next();
        });
        assertNextBehavior();
    });

    describe('when receiving a "next" event from the payload view', function () {
        beforeEach(function () {
            payload.trigger('next');
        });
        assertNextBehavior();
    });

    describe('when calling start', function () {
        it('should show the payload view on the passed region', function () {
            spyOn(region, 'show');
            adapter.start();
            expect(region.show).toHaveBeenCalledWith(payload);
        });
    });
});
