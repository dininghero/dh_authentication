const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const crypto = require('crypto');
const salt = require('./utility/index').salt;

/* SHA256 hashing - passwords may be any size */
const aes256 = require('aes256');

const app = express();

/* Middleware */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//for further streamlining, add parsers to only the routes that need the specific ones / will cut down on the amount of code needing to be run from top to bottom and reduce latency and bottlenecking in high traffic - run tests for this theory

/* "R_A_C" - Restaurant Account Creation */
app.post('/RAC', (req, res) => {
  let randomString = salt(10);
  let key = 'my passphrase';
  let plaintext = 'my plaintext message'; 
  let encrypted = aes256.encrypt(key + randomString, plaintext);
  let decrypted = aes256.decrypt(key + randomString, encrypted);

  let test_token = {
    key: key,
    plain: plaintext,
    en: encrypted,
    de: decrypted,
    ss: randomString,
  };

  res.status(200).send(test_token);
});

app.listen(port, () => console.log(`*** app listening on http://localhost:${port}/ ***`));
