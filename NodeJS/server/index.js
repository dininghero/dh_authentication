const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const { connect }  = require('../db/mongo/connections/index');
const crypto = require('crypto');
const { salt, verifyContent } = require('./utility/index');
const { createAccount } =  require('../db/mongo/models/index');

/* SHA256 hashing - passwords may be any size */
const aes256 = require('aes256');

const app = express();

/* Middleware */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// for further streamlining, add parsers to only the routes that need the specific ones / will cut down on the amount of code needing to be run from top to bottom and reduce latency and bottlenecking in high traffic - run tests for this theory

/* "RAC" - Restaurant Account Creation */
app.post('/RAC', (req, res) => {
  // let decrypted = aes256.decrypt(saltedPassword, encrypted);

  // /* flag determines whether or not there is an error anywhere in the account creation process */
  let accountVerification = new Promise ((resolve, reject) => {
    let checkEntry = verifyContent(req.body);
    resolve(checkEntry);
  }).then(result => {
    /* checks returned token for any false values and if there are, sends 200 */
    if (!result.email || !result.restaurant) {
      res.status(200).send(result);
    } else {
      let saltValue = salt(10); /* salt values will be 10 chars in length */
      let saltedPassword = req.body.pw + saltValue;
      let encryptedPassword =  aes256.encrypt(saltedPassword, JSON.stringify(req.body));
      console.log(encryptedPassword);
      /** input value */
      let newUser = {
        restaurant: req.body.restaurant,
        pw: encryptedPassword,
        salt: saltValue,
        email: req.body.email, 
      };

      /** insert entry into database */
      createAccount(newUser);
      res.status(200).send('Success!');
    };
  }).catch(error => {
    console.log(error);
  });
});

const listen = () => app.listen(port, () => console.log(`*** app listening on http://localhost:${port}/ ***`));

/** creates connection to MongoDb and when connection is established, starts server  */

connect(listen);