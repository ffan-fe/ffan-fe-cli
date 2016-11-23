"use strict";

var jQuery = require('jquery');

/**
 * 获取 reject 对象
 * @param params
 * @returns {*}
 */
module.exports.getReject = function getReject(params) {
  return new jQuery.Deferred().reject(params).promise();
};

/**
 * 获取 resolve 对象
 * @param params
 * @returns {*}
 */
module.exports.getResolve = function getResolve(params) {
  return new jQuery.Deferred().resolve(params).promise();
};

/**
 * 获取请求结果
 * @param promise
 * @returns {*}
 */
module.exports.getResult = function getResult(promise) {
  var deferred = new jQuery.Deferred();

  promise.then(
    function (result) {
      if (typeof result['status'] !== 'undefined') {

        if (result['status'] !== 200) {
          deferred.reject(result);
        } else {
          deferred.resolve(result.data);
        }
      } else {
        deferred.reject(result);
      }
    },
    function (reason) {
      deferred.reject(reason);
    }
  )

  return deferred.promise();
}
