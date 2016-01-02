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
    this._pathLoader = config.pathLoader;
    this.isSelectedForTreatment = false;
};

Stream.prototype.getTreatmentCost = function (costPerUnit) {
    return Math.round(this.streamLength * costPerUnit * this.treatmentCostMultiplier * 100) / 100;
};

Stream.prototype.applyTreatment = function () {
    this.infestationDensity = Math.random() * 100;
    this.isSelectedForTreatment = false;
};

Stream.prototype.getHeadLocation = function () {
    return this._headLocation;
}

Stream.prototype.show = function (mapWrapper) {
    var self = this;
    if (this._paths === null) {
        this._pathLoader.load(
            this.id,
            mapWrapper,
            function (paths) {
                self._paths = paths;
                _showPaths.call(self, mapWrapper);
            });
    } else {
        _showPaths.call(this, mapWrapper);
    }
};

function _showPaths(mapWrapper) {
    this._paths.forEach(function (path) {
        mapWrapper.showLine(path);
    });
}

Stream.prototype.hide = function (mapWrapper) {
    this._paths.forEach(function (path) {
        mapWrapper.removeLine(path);
    });
};

module.exports = Stream;