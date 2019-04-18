const express = require('express');
const cors = require('cors');
const chalk = require('chalk');

/* Mongo Connection */
const { connect } = require('../db/mongo/connection/index');

const ral = require('./middlewares/ral');
const rac = require('./middlewares/rac');
const cookie = require('./middlewares/cookie');
const vat = require('./middlewares/vat');
const ralo = require('./middlewares/ralo');
const tblv = require('./middlewares/tblv');
const ec = require('./middlewares/ec');
const cc = require('./middlewares/cc');

const port = 3000;
const app = express();

// const whitelist = ['http://localhost:3001', 'http://localhost:1000'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// app.use(cors(corsOptions));

// Enable CORS
app.use((req, res, next) => {
  /* Allowed connection */
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3001');
  /* Allowed methods */
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  /* Allowed headers */
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  /* Set to true if you need the website to include cookies in the requests
    sent to the API (e.g. in case you use sessions) */
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

/* Parse application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: false }));

/* Parse application/json */
app.use(express.json());

/* Cookie parser middleware */
app.use('/', [cookie, tblv, ec, vat, cc]);

/* Router-level middleware */
app.use('/', [ral, rac, ralo]);

/* route used execlusively for testing */
app.post('/test', (req, res) => {
  res.send('endpoint: /test');
});

/* Creates connection to MongoDb and when connection is established, starts server */
const listen = () => app.listen(port, () => {
  console.log(chalk.yellow(`* App listening on: http://localhost:${port}`));
});

connect(listen);
