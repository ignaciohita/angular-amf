/*global angular, amf */
angular.module("angularAmf", []).factory("$amf", ["$q", function ($q) {
    "use strict";

    var amfClient;

    return {
        init: function (destination, endpoint) {
            amfClient = new amf.Client(destination, endpoint);
        },

        invoke: function (source, operation, params) {
            var deferred = $q.defer(),
                amfCallback = function (e) {
                    if (e) {
                        deferred.resolve(e);
                    } else {
                        deferred.reject("An error has occurred.");
                    }
                },
                amfStatus = function (e) {
                    if (e.hasOwnProperty("faultCode") && e.faultCode !== -1) {
                        deferred.reject(e);
                    } else {
                        deferred.notify(e);
                    }
                };

            amfClient.invoke(source, operation, params, amfCallback, amfStatus);

            return deferred.promise;
        }
    };
}]);
