/**
 * Created by Eric on 1/1/2016.
 */
var Config = require('./Config');

module.exports = {
    create: function (stream) {
        return {
            location: stream.getHeadLocation(),
            popup: {
                message: createDisplay(stream),
                onOpen: stream.show.bind(stream),
                onClose: stream.hide.bind(stream)
            }
        };
    },
    watchForEvents: function (elementId, gameState) {
        var mapElement = document.getElementById(elementId);
        mapElement.addEventListener('click', function (event) {
            var streamId = event.srcElement.attributes['stream-id'];
            gameState.toggleStreamTreatment(streamId);
        });
    }
};

function createDisplay(stream, cost) {
    var title = stream.title;
    var streamId = stream.id;
    var treatmentCost = stream.getTreatmentCost(Config.baseTreatmentCost);
    var severity = format(stream.infestationDensity);
    return '<strong>' + title + '</strong></br>' +
        '<strong>Infestation: </strong>' + severity + '/per sq m<br/>' +
        '<strong>Cost: </strong>$' + treatmentCost + '<br/>' +
        '<input type="checkbox" stream-id="' + streamId + '" />' +
        '<label for="' + streamId + '">Apply Treatment</label>';
}

function format(number) {
    return Math.round(number * 100) / 100;
}