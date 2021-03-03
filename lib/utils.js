
// require('dotenv').config({debug:false})
require('dotenv').config()

const assert    = require('assert');

module.exports.async = {};

// --------------------------------------------------------------------------------------------------------------------
module.exports.is_ok = function(err, ...rest) {
  if (!err) {
    return true
  }

  return false;
};
module.exports.async.is_ok = module.exports.is_ok;

// --------------------------------------------------------------------------------------------------------------------
module.exports.complain = function(callback, [err, ...rest], operation) {
  assert(err, `Error trying to ${operation}`);

  if (callback) {
    return callback(err, ...rest);
  }
};

// --------------------------------------------------------------------------------------------------------------------
module.exports.async.complain = function([err, ...rest], operation) {
  const message = `Error trying to ${operation}`;
  assert(err, message);

  throw new Error(message);
};
