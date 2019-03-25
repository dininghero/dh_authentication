const express = require('express');

const { connect } = require('../db/mongo/connections/index');

const ral = require('./middlewares/ral');
const rac = require('./middlewares/rac');
const vat = require('./middlewares/vat');
const ralo = require('./middlewares/ralo');

const port = 3000;
const app = express();

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json
app.use(express.json());

// For further streamlining, add parsers to only the routes that need the specific
// ones / will cut down on the amount of code needing to be run from top to bottom
// and reduce latency and bottlenecking in high traffic - run tests for this theory

/* Router-level middleware */
app.use('/', [ral, rac, vat, ralo]);

/* Creates connection to MongoDb and when connection is established, starts server */
const listen = () => app.listen(port, () => {
  console.log(`*** App listening on http://localhost:${port}/ ***`);
});

connect(listen);
