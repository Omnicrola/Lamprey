/**
 * Created by Eric on 1/1/2016.
 */

/*
 requires an import tag for Leaflet already on the page
 <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>

 */
var Leaflet = {
    loadMap: function (config) {
        var leafletMap = L.map(config.mapElementId).setView(config.defaultViewCoordinates, config.defaultZoom);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'jeffglc.of7g059c',
            accessToken: 'pk.eyJ1IjoiamVmZmdsYyIsImEiOiJjaWlic2V2ZWgwMWtkd2VsemxnNjU0amplIn0.4_KiKQDyeSB5BroosNCdAA'
        }).addTo(leafletMap);


        var wrapper = {};
        wrapper.createMapPoint = function (point) {
            return new L.LatLng(point.x, point.y);
        };
        wrapper.createLine = function (points, config) {
            var polyLine = new L.Polyline(points, config);
            return polyLine;
        };
        wrapper.showLine = function (line) {
            line.addTo(leafletMap);
        };
        wrapper.removeLine = function (line) {
            leafletMap.removeLayer(line);
        };
        wrapper.addMarker = function (config) {
            var marker = L.marker(config.location).addTo(leafletMap);
            marker.bindPopup(config.popup.message);
            marker.on('popupopen', function () {
                config.popup.onOpen(wrapper)
            });
            marker.on('popupclose', function () {
                config.popup.onClose(wrapper);
            });
            return marker;
        };
        return wrapper;
    }
};
module.exports = Leaflet;