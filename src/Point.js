/**
 * Created by Eric on 1/1/2016.
 */
var Point = function (x, y) {
    Object.defineProperties(this,
        {
            x: {
                writeable: false,
                enumerable: true,
                value: x
            },
            y: {
                writeable: false,
                enumerable: true,
                value: y
            }
        });
};

module.exports = Point;