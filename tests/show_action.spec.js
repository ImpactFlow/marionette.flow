'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var ShowAction = require('../lib/show_action');

describe('show_action', function () {
    var action;
    var flow;
    var payload;
    var region;
    var view;

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
        view = new Marionette.View();
        payload = function () {
            return view;
        };
        region = new Marionette.Region({
            el: document.createElement('div'),
        });
        action = new ShowAction({
            region: region,
        });
        action.setFlow(flow);

    });

    it('should exist', function () {
        expect(action).toBeDefined();
    });

    describe('when calling next', function () {
        beforeEach(function () {
            action.next();
        });
        assertNextBehavior();
    });

    describe('when calling start', function () {
        beforeEach(function () {
            spyOn(region, 'show');
            action.start(payload);
        });

        it('should show the payload view on the passed region', function () {
            expect(region.show).toHaveBeenCalledWith(view);
        });

        describe('when triggering next', function () {
            beforeEach(function () {
                view.trigger('next');
            });

            assertNextBehavior();

            it('should remove onNext listener', function () {
                expect(view._events['next']).not.toBeDefined();
            });
        });
    });
});
