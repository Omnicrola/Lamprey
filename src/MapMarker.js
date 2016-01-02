/**
 * Created by Eric on 1/1/2016.
 */
module.exports = {
    create: function (stream) {
        return {
            location: stream.getHeadLocation(),
            popup: {
                message: createDisplay(stream.title, stream.id, stream.getTreatmentCost()),
                onOpen: stream.show.bind(stream),
                onClose: stream.hide.bind(stream)
            }
        };
    },
    watchForEvents: function (elementId, gameState) {
        var mapElement = document.getElementById(elementId);
        mapElement.addEventListener('click', function (event) {
            var streamId = event.srcElement.attributes['stream-id'];
            console.log(streamId);
        });
    }
};

function createDisplay(title, streamId, cost) {
    return title + '</br>' +
        '<em>Cost:</em>' + cost + '<br/>' +
        '<label for="' + streamId + '">Apply Treatment</label>' +
        '<input type="checkbox" stream-id="' + streamId + '" />';
}