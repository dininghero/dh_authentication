const express = require('express');
const cors = require('cors');

const { connect } = require('../db/mongo/connections/index');

const ral = require('./middlewares/ral');
const rac = require('./middlewares/rac');
const cookie = require('./middlewares/cookie');
const vat = require('./middlewares/vat');
const ralo = require('./middlewares/ralo');

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
  },
};

app.use(cors(corsOptions));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json
app.use(express.json());

// Cookie parser middleware
app.use('/', [cookie]);

/* Router-level middleware */
app.use('/', [ral, rac, vat, ralo]);

/* Creates connection to MongoDb and when connection is established, starts server */
const listen = () => app.listen(port, () => {
  console.log(`*** App listening on http://localhost:${port}/ ***`);
});

connect(listen);
