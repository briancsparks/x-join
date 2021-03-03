#!/usr/bin/env node

const { mkARGV, mkCONFIG }      = require('../lib/extern/config');
const { read }                  = require('../lib/read');

read({}, (err, value) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(value);
});
