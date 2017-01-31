'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var MarionetteBuilder = require('../lib/marionette_builder');
var ShowAction = require('../lib/show_action');

describe('marionette_builder', function () {
    var builder;
    var flow;
    var region;
    var viewFunction;
    var whenFinishedFn;
    beforeEach(function () {
        Backbone.$ = $;
        region = new Marionette.Region({
            el: document.createElement('div'),
        });
        builder = new MarionetteBuilder({
            region: region,
        });
        whenFinishedFn = jasmine.createSpy();
    });

    describe('when building with view functions', function () {
        beforeEach(function () {
            viewFunction = function () {
                return new Marionette.ItemView();
            };
            flow = builder
                .addView(viewFunction, {
                    name: 'v1',
                    next: 'v2',
                })
                .addView(viewFunction, {
                    name: 'v2',
                    next: 'v3',
                })
                .addView(viewFunction, 'v3')
                .startAtView('v1')
                .whenFinished(whenFinishedFn)
                .whenFinished(whenFinishedFn)   // Yes, we're testing adding multiples :)
                .build();
        });

        it('should create a graph matching definition', function () {
            var graph = flow.getGraph();
            var v1_nextVertex = graph.getNextVertex(graph.getVertexNamed('v1'));
            var v2_nextVertex = graph.getNextVertex(graph.getVertexNamed('v2'));

            expect(graph.getAllVertexNames()).toEqual(['v1', 'v2', 'v3']);
            expect(graph.getSourceVertex().getName()).toEqual('v1');
            expect(v1_nextVertex.getName()).toEqual('v2');
            expect(v2_nextVertex.getName()).toEqual('v3');
            expect(graph.getAllSinkNames()).toEqual(['v3']);
        });

        it('should have an actionBuilderFn which returns a MarionetteShowAction', function () {
            var showActionFn = flow.getActionBuilderFunctions()[0];
            var payload = { viewFn: viewFunction };
            expect(showActionFn(flow, payload) instanceof ShowAction).toEqual(true);
        });

        it('should inject finished functions', function () {
            expect(flow.getWhenFinishedFunctions()).toEqual([
                whenFinishedFn,
                whenFinishedFn,
            ]);
        });
    });
});
