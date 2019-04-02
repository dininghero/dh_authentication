const express = require('express');
const cors = require('cors');

const { connect } = require('../db/mongo/connections/index');

const ral = require('./middlewares/ral');
const rac = require('./middlewares/rac');
const cookie = require('./middlewares/cookie');

const port = 3000;
const app = express();

const whitelist = ['http://localhost:1000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json
app.use(express.json());

// Cookie parser middleware
app.use('/', [cookie]);

// For further streamlining, add parsers to only the routes that need the specific
// ones / will cut down on the amount of code needing to be run from top to bottom
// and reduce latency and bottlenecking in high traffic - run tests for this theory

/* Router-level middleware */
app.use('/', [ral, rac]);

/* Creates connection to MongoDb and when connection is established, starts server */
const listen = () => app.listen(port, () => {
  console.log(`*** App listening on http://localhost:${port}/ ***`);
});

connect(listen);
