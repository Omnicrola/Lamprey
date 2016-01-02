/**
 * Created by Eric on 1/1/2016.
 */

/*
 requires an import tag for Leaflet already on the page
 <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>

 */

var Config = require('./Config');

var Leaflet = {
    loadMap: function (config) {
        var leafletMap = L.map(config.mapElementId).setView(config.defaultViewCoordinates, config.defaultZoom);
        L.tileLayer(Config.leaflet.apiUrl(), {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: Config.leaflet.apiId(),
            accessToken: Config.leaflet.apiKey()
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
        wrapper.addButton = function (config) {
            L.Control[config.name] = L.Control.extend({
                options: {},
                onAdd: function (map) {
                    var controlDiv = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');
                    L.DomEvent
                        .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
                        .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
                        .addListener(controlDiv, 'click', function () {
                            config.action(map)
                        });

                    var controlUI = L.DomUtil.create('a', 'leaflet-draw-edit-remove', controlDiv);
                    controlUI.href = '#';
                    controlUI.text = config.displayTitle;
                    return controlDiv;
                }
            });

            var newControl = new L.Control[config.name]();
            leafletMap.addControl(newControl);
            return _controlWrapper(newControl);
        };
        return wrapper;
    }
};

function _controlWrapper(control) {
    return {};
};
module.exports = Leaflet;