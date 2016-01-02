/**
 * Created by Eric on 1/1/2016.
 */

var http = 'http://'
var domain = '10.0.0.45';

function url(path) {
    return http + domain + path;
}
module.exports = {
    baseTreatmentCost: 10.0,
    leaflet: {
        apiUrl: function () {
            return 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
        },
        apiId: function () {
            return 'jeffglc.of7g059c';
        },
        apiKey: function () {
            return 'pk.eyJ1IjoiamVmZmdsYyIsImEiOiJjaWlic2V2ZWgwMWtkd2VsemxnNjU0amplIn0.4_KiKQDyeSB5BroosNCdAA';
        }
    },
    api: {
        getStreams: function () {
            return url('/ajax/getStreams.php?');
        },
        getStreamPaths: function (id) {
            return url('/ajax/getStreamPath.php?id=' + id);
        },

    }
};