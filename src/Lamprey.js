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
        var gameState = new GameState();
        var playButton = document.getElementById(config.playButtonId);
        playButton.onClick = function () {
            gameState.cycleOnce();
        };

        StreamDataRetriever.getData(function (data) {
            window.foo = data;
        });

        var points = [
            new Point(42.945279400000061, -85.852150510999991),
            new Point(43.001563933000057, -85.893484576999981)
        ];
        var title = "<b>Grand River</b><br>250 miles<br>73% infestation";
        var myStream = new Stream(title, points);

        var marker = leafMap.addMarker({
            location: [43.058363, -86.250297],
            popup: {
                message: myStream.title,
                onOpen: myStream.show.bind(myStream),
                onClose: myStream.hide.bind(myStream)
            }
        });
    }
};