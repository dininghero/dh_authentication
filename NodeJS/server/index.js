const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { salt, verifyContent, verifyPassword, encryption, decryption } = require('./utility/index');
const { connect } = require('../db/mongo/connections/index');
const { createAccount, loginAccount } = require('../db/mongo/models/index');

const port = 3000;
const app = express();

/* Middleware */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/*
* for further streamlining, add parsers to only the routes that need the specific
* ones / will cut down on the amount of code needing to be run from top to bottom
* and reduce latency and bottlenecking in high traffic - run tests for this theory
*/

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

/* "RAC" - Restaurant Account Creation */
app.post('/RAC', (req, res) => {
  return new Promise((resolve, reject) => {
    const checkEntry = verifyContent(req.body);
    resolve(checkEntry);
  }).then((result) => {
    /* checks returned token for any false values and if there are, sends 200 */
    if (!result.email || !result.restaurant) {
      res.status(200).send(result);
    } else {
      const saltValue = salt(16); /* salt values will be 16 bytes - 128 bit*/
      const saltedPassword = req.body.pw + saltValue;
      const encrypted = encryption(saltedPassword, req.body.pw);

      /** input value */
      const newUser = {
        restaurant: req.body.restaurant,
        pw: encrypted,
        salt: saltValue,
        email: req.body.email,
      };

      /** insert entry into database */
      createAccount(newUser);
      res.status(200).send('Success!');
    }
  }).catch((error) => {
    console.log(error);
  });
});

const listen = () => app.listen(port, () => console.log(`*** app listening on http://localhost:${port}/ ***`));

/** creates connection to MongoDb and when connection is established, starts server  */
connect(listen);
