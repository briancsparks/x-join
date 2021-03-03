
// require('dotenv').config({debug:false})
require('dotenv').config()

const util          = require('util');
const mongo         = require('./libs/mongo');
const {complain}    = require("./utils");
const {is_ok}       = require("./utils");

// console.log(util.inspect(process.env, false, null, true));

const dbname        = process.env.MONGODB_DBNAME || 'rootconfig';

module.exports.read = function(query, callback) {

  return mongo.connect(dbname, 'config', function (err, col, closeDb =noop) {
    if (err)  { return callback(err); }

    return col.findOne(query, function (err, item) {
      if (!is_ok(err))      { return complain(callback, [err, item], `findOne(${query})`); }

      closeDb();
      return callback(err, item);
    });
  });
};

function noop(){}

