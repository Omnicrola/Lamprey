/**
 * Created by Eric on 1/1/2016.
 */

var Stream = require('./Stream');
var Point = require('./Point');
var Ajax = require('./Ajax');
var Config = require('./Config');

module.exports = {
    getAllStreams: function (consumer) {
        Ajax
            .get(Config.api.getStreams())
            .success(function (data) {
                var streams = data.map(function (dataElement) {
                    return new Stream({
                        name: dataElement.name,
                        id: dataElement.id,
                        streamLength: dataElement.length,
                        infestationDensity: Math.random() * 100,
                        headLocation: [dataElement.mouth_lat, dataElement.mouth_long],
                        pathLoader: {
                            load: _getPath
                        },
                        paths: null
                    });
                });
                consumer(streams);

            })
            .json()
            .send();
    },
};

function _getPath(streamId, mapWrapper, callback) {
    Ajax.get(Config.api.getStreamPaths(streamId))
        .success(function (data) {
            console.log(data);
            var paths = parsePaths(data.paths, mapWrapper);
            callback(paths);
        })
        .json()
        .send();
}

function parseFeature(feature, mapWrapper) {
    var name = feature.attributes.Name;
    var id = feature.attributes.OBJECTID;
    var length = feature.attributes.Shape_Length;
    var infestationDensity = Math.random() * 100;
    var paths = parsePaths(feature.geometry.paths, mapWrapper);
    var headLocation = feature.geometry.paths[0][0].reverse();
    return new Stream({
        name: name,
        id: id,
        streamLength: length,
        infestationDensity: infestationDensity,
        headLocation: headLocation,
        paths: paths
    });
}

function parsePaths(allPaths, mapWrapper) {
    var allPaths = allPaths.map(function (points) {
        var reversedPoints = flipPoints(points);
        var line = mapWrapper.createLine(reversedPoints, {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
        });
        return line;
    });
    return allPaths;
}

function flipPoints(points) {
    return points.map(function (point) {
        return [point[1], point[0]];
    });
}