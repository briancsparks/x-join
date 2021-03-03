
// require('dotenv').config({debug:false})
require('dotenv').config()

const MongoClient   = require('mongodb').MongoClient;
const util          = require('util');
const {complain}    = require("../utils");
const {is_ok}       = require("../utils");

module.exports.async = {};

const mongo_user    = process.env.MONGODB_USER || 'chekov';
const mongo_pass    = process.env.MONGODB_PASS;
const mongo_fqdn    = process.env.MONGODB_FQDN;

// Cache the connection
let   dbs = {};

module.exports.connect = function(dbname, collectionName, callback) {
  let   db          = dbs[dbname];
  let   collection;

  if (db) {
    collection = db.collection(collectionName);
    return callback(null, collection, /* closeFn= */ noop);
  }

  const client  = new MongoClient(dbUri(dbname), { useNewUrlParser: true, useUnifiedTopology: true });

  return client.connect((err, mongoClient) => {
    if (!is_ok(err))      { return complain(callback, [err, mongoClient], `connect to ${dbname}`); }

    db            = mongoClient.db(dbname);
    collection    = db.collection(collectionName);
    dbs[dbname]   = mongoClient;

    //console.log({err, mongoClient, db});

    return callback(null, collection, closeClient);
  });

  // ------------------------------------------------------------------------------------------------------------------
  function closeClient() {
    dbs[dbname].close();
    delete dbs[dbname];
  }
};

module.exports.async.connect = util.promisify(module.exports.connect);

function dbUri(dbname) {
  const uri   = `mongodb+srv://${mongo_user}:${mongo_pass}@${mongo_fqdn}/${dbname}?retryWrites=true&w=majority`;
  return uri;
}

function noop() {}
