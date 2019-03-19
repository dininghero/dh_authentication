const express = require('express');
const crypto = require('crypto');

const { verifyContent, verifyPassword, encryption, decryption } = require('./utility/index');
const { connect } = require('../db/mongo/connections/index');
const { createAccount, loginAccount } = require('../db/mongo/models/index');

const port = 3000;
const app = express();

/* Middleware */

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json
app.use(express.json());

// For further streamlining, add parsers to only the routes that need the specific
// ones / will cut down on the amount of code needing to be run from top to bottom
// and reduce latency and bottlenecking in high traffic - run tests for this theory

/* "RAL" - Restaurant Account Log-in */
app.get('/RAL', (req, res) => {
  return new Promise ((resolve, reject) => {
    let verification = verifyPassword(req.body);
    resolve(verification);
  }).then(result => {
    if (typeof result !== 'string') {
      res.status(200).send('some of sort CSRF token/cookie');
    } else {
      res.status(200).send('Log-in unsuccessful. Check email or password.');
    }
  })
});

/**
  * Restaurant Account Creation
  * URL: '/rac'
  * Method: POST
  * Data Params: { email: [string], pw: [string], restaurant: [string] }
  */
app.post('/rac', (req, res) => {
  verifyContent(req.body)
    .then((result) => {
      /* Checks returned token for any false values and if there are, send 409 conflit */
      if (!result.email || !result.restaurant) {
        if (!result.restaurant && !result.email) {
          res.status(409).send({
            response: 'Email and restaurant already exist',
          });
        } else if (!result.email) {
          res.status(409).send({
            response: 'Email already exist',
          });
        } else {
          res.status(409).send({
            response: 'Restaurant already exist',
          });
        }
      } else {
        /* Else encrypt password and create a new account */
        const encrypted = encryption(req.body.pw);

        /* Token for database entry */
        const newUser = {
          restaurant: req.body.restaurant,
          pw: encrypted.hash,
          salt: encrypted.salt,
          email: req.body.email,
        };

        /* Insert entry into database */
        createAccount(newUser)
          .then(() => {
            res.status(201).send({
              response: 'Account created',
            });
          })
          .catch((err) => {
            res.status(400).send({
              response: 'Couldn\'t create account',
              error: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).send({
        response: 'Couldn\'t create account',
        error: err.message,
      });
    });
});

/* Creates connection to MongoDb and when connection is established, starts server */
const listen = () => app.listen(port, () => {
  console.log(`*** app listening on http://localhost:${port}/ ***`);
});

connect(listen);
