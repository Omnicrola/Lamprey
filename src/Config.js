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
    api: {
        getStreams: function () {
            return url('/ajax/getStreams.php?');
        },
        getStreamPaths: function (id) {
            return url('/ajax/getStreamPath.php?id=' + id);
        },

    }
};