/**
 * Created by Eric on 1/1/2016.
 */

var Stream = require('./Stream');
var Point = require('./Point');
var Ajax = require('./Ajax');

module.exports = {
    getAllStreams: function (consumer) {
        Ajax
            .get('http://10.0.0.45/ajax/getStreams.php?')
            .success(function (data) {
                consumer(data.map(function (dataElement) {
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
                }));

            })
            .json()
            .send();
    },
    getData: function (consumer, mapWrapper) {
        console.log('requesting...');
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('GET', 'JeffsQuandry.json');
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState === XMLHttpRequest.DONE &&
                xmlHttpRequest.status === 200) {
                var rawData = JSON.parse(xmlHttpRequest.responseText);
                var processedData = processData(rawData, mapWrapper);
                consumer(processedData);
            }
        };
        xmlHttpRequest.send();
    }
};

function _getPath(streamId, mapWrapper, callback) {
    Ajax.get('http://10.0.0.45/ajax/getStreamPath.php?id=' + streamId)
        .success(function (data) {
            console.log(data);
            var paths = parsePaths(data.paths, mapWrapper);
            callback(paths);
        })
        .json()
        .send();
}

function processData(rawData, mapWrapper) {
    console.log('features: ' + rawData.features.length);
    var streams = rawData.features.map(function (feature) {
        return parseFeature(feature, mapWrapper);
    });
    return streams;
}

function parseFeature(feature, mapWrapper) {
    var name = feature.attributes.Name;
    var id = feature.attributes.OBJECTID;
    var length = feature.attributes.Shape_Length;
    var infestationDensity = Math.random() * 100;
    console.log('paths: ' + feature.geometry.paths.length);
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
    console.log('> parsed paths: ' + allPaths.length);
    return allPaths;
}

function flipPoints(points) {
    return points.map(function (point) {
        return [point[1], point[0]];
    });
}