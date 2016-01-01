/**
 * Created by Eric on 1/1/2016.
 */
var GameState = function () {
    this.currentYear = 2010;
    this.currentBudget = 1000000;
    this.infestationDensity = 100;
};

GameState.prototype.cycleOnce = function () {
    console.log('cycle!');
};

module.exports = GameState;