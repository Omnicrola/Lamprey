/**
 * Created by Eric on 1/1/2016.
 */

var Stream = require('./Stream');
var Point = require('./Point');

module.exports = {
    getData: function (consumer) {
        console.log('requesting...');
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('GET', 'JeffsQuandry.json');
        xmlHttpRequest.on
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState === XMLHttpRequest.DONE &&
                xmlHttpRequest.status === 200) {
                var processedData = processData(JSON.parse(xmlHttpRequest.responseText));
                consumer(processedData);
            }
        };
        xmlHttpRequest.send(null);
    }
};

function processData(rawData) {
    console.log('features: ' + rawData.features.length);
    var streams = rawData.features.map(function (feature) {
        return parseFeature(feature);
    });
    return streams;
}

function parseFeature(feature) {
    var name = feature.attributes.Name;
    var shapeLength = feature.attributes.Shape_Length;
    console.log('paths: ' + feature.geometry.paths.length);
    var paths = parsePaths(feature.geometry.paths);
    return new Stream(name, shapeLength, paths);
}

function parsePaths(pathData) {
    return pathData.map(function (path) {
        console.log('points: ' + path.length);
        return parsePath(path);
    });
}

function parsePath(path) {
    return path.map(function (coordinates) {
        return new Point(coordinates[0], coordinates[1]);
    });
}