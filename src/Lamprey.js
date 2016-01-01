/**
 * Created by Eric on 1/1/2016.
 */

var GameState = require('./GameState');
var LeafletWrapper = require('./LeafletWrapper');
var StreamDataRetriever = require('./StreamDataRetriever');
var Point = require('./Point');
var Stream = require('./Stream');

window.Lamprey = {
    start: function (config) {
        var leafMap = LeafletWrapper.loadMap(config);
        //var gameState = new GameState();
        //var playButton = document.getElementById(config.playButtonId);
        //playButton.onClick = function () {
        //    gameState.cycleOnce();
        //};

        StreamDataRetriever.getData(function (streams) {
            streams.forEach(function (stream) {
                leafMap.addMarker({
                    location: stream.getHeadLocation(),
                    popup: {
                        message: stream.title,
                        onOpen: stream.show.bind(stream),
                        onClose: stream.hide.bind(stream)
                    }
                });
            });
        }, leafMap);

    }
};