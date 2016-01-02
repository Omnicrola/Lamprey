/**
 * Created by Eric on 1/1/2016.
 */
var GameState = function (config) {
    this.costPerUnit = 10.00;
    this.currentYear = 2010;
    this.currentBudget = 1000000;
    this.infestationDensity = 100;
    this._streams = [];
    this._observers = [];
};

GameState.prototype.addStream = function (stream) {
    this._streams.push(stream);
};

GameState.prototype.toggleStreamTreatment = function (streamId) {
    this._streams.forEach(function (stream) {
        if (stream.id == streamId) {
            stream.isSelectedForTreatment = !stream.isSelectedForTreatment;
        }
    });
};

GameState.prototype.cycleOnce = function () {
    console.log('cycle!');
    console.log('> streams: ' + this._streams.length);
    var self = this;
    var infestations = [];
    this._streams.forEach(function (stream) {
        if (stream.isSelectedForTreatment) {
            stream.applyTreatment();
            console.log('> > infestation: ' + stream.infestationDensity);
            infestations.push(stream.infestationDensity);
            self.currentBudget -= stream.getTreatmentCost(self.costPerUnit);
        }
    });

    this.infestationDensity = average(infestations);
    this.currentYear++;
    notifyObservers.call(this);
    console.log('budget left: ' + this.currentBudget);
    console.log('infestation density: ' + this.infestationDensity);
};

function notifyObservers() {
    var info = {
        infestationDensity: this.infestationDensity,
        currentBudget: this.currentBudget,
        currentYear: this.currentYear
    };
    this._observers.forEach(function (observer) {
        observer(info);
    });
}

GameState.prototype.addObserver = function (observer) {
    this._observers.push(observer);
};

function average(values) {
    var sum = values.reduce(function (a, b) {
        return a + b;
    }, 0);
    return sum / values.length;
}
module.exports = GameState;