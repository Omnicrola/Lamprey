/**
 * Created by Eric on 1/1/2016.
 */
var Ajax = {
    get: function (url) {
        var handler = {
            success: function () {
            },
            fail: function () {
            }
        };
        var isJson = false;
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('GET', url);
        xmlHttpRequest.onreadystatechange = function () {
            if (xmlHttpRequest.readyState === XMLHttpRequest.DONE) {
                if (xmlHttpRequest.status === 200) {
                    var data = xmlHttpRequest.responseText;
                    if (isJson) {
                        data = JSON.parse(data);
                    }
                    handler.success(data);
                } else {
                    handler.fail(xmlHttpRequest.status, xmlHttpRequest.data);
                }
            }
        }

        return {
            success: function (successCallback) {
                handler.success = successCallback;
                return this;
            },
            fail: function (failCallback) {
                handler.fail = failCallback;
                return this;
            },
            json: function () {
                isJson = true;
                return this;
            },
            send: function () {
                xmlHttpRequest.send();
            }
        }

    }
};
module.exports = Ajax;