/**
 * Created by Eric on 1/1/2016.
 */
var Stream = function (config) {
    this.streamLength = config.streamLength;
    this.infestationDensity = config.infestationDensity;
    this.treatmentCostMultiplier = 1.0;
    this._paths = config.paths;
    this._headLocation = config.headLocation;
    this.title = config.name;
    this.id = config.id;
    this.isSelectedForTreatment = false;
};

Stream.prototype.getTreatmentCost = function (costPerUnit) {
    return this.streamLength * costPerUnit * this.treatmentCostMultiplier;
};

Stream.prototype.applyTreatment = function () {
    this.infestationDensity = Math.random() * 100;
    this.isSelectedForTreatment = false;
};

Stream.prototype.getHeadLocation = function () {
    return this._headLocation;
}

Stream.prototype.show = function (mapWrapper) {
    this._paths.forEach(function (path) {
        mapWrapper.showLine(path);
    });
};

Stream.prototype.hide = function (mapWrapper) {
    this._paths.forEach(function (path) {
        mapWrapper.removeLine(path);
    });
};

module.exports = Stream;