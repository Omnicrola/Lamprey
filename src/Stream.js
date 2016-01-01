/**
 * Created by Eric on 1/1/2016.
 */
var Stream = function (title, points) {
    this.length = 100;
    this.infestationDensity = 100;
    this.treatmentCostMultiplier = 1.0;
    this._path = points;
    this.title = title;
};

Stream.prototype.applyTreatment = function () {
    this.infestationDensity = Math.random() * 100;
};

Stream.prototype.show = function (mapWrapper) {
    var pointList = this._path.map(function (point) {
        return mapWrapper.createMapPoint(point);
    });
    this._currentLine = mapWrapper.createLine(pointList, {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    });
    mapWrapper.showLine(this._currentLine);
};

Stream.prototype.hide = function (mapWrapper) {
    mapWrapper.removeLine(this._currentLine);
};

module.exports = Stream;