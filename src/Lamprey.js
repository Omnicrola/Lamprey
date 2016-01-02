/**
 * Created by Eric on 1/1/2016.
 */

var GameState = require('./GameState');
var LeafletWrapper = require('./LeafletWrapper');
var MapMarker = require('./MapMarker');
var StreamDataRetriever = require('./StreamDataRetriever');
var Point = require('./Point');
var Stream = require('./Stream');

window.Lamprey = {
    start: function (config) {
        var leafMap = LeafletWrapper.loadMap(config);
        var gameState = new GameState();

        StreamDataRetriever.getAllStreams(function (streams) {
            streams.forEach(function (stream) {
                gameState.addStream(stream);
                leafMap.addMarker(MapMarker.create(stream));
            });
            MapMarker.watchForEvents(config.mapElementId, gameState);
        });

        leafMap.addButton({
            name: 'Play',
            displayTitle: 'Play',
            action: function (map) {
                gameState.cycleOnce();
            }
        });

    }
};