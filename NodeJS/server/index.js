const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const crypto = require('crypto');
const { salt, verifyContent } = require('./utility/index');

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
  /** 
   * data shape for post request should be as follows 
   * @param { username: entry, password: entry }
  */
  
  let inputData = req.body;
  let saltValue = salt(10); /* salt values will be 10 chars in length */
  let username = req.body.username;
  let password = req.body.password;
  let saltedPassword = password + saltValue
  let mockdata = {test: 'you\'ve been hacked'};
  let encrypted = aes256.encrypt(saltedPassword, JSON.stringify(mockdata));
  let decrypted = aes256.decrypt(saltedPassword, encrypted);

  let test_token = {
    user: username,
    pw: password,
    en: encrypted,
    de: decrypted,
    realde: JSON.parse(decrypted),
    ss: saltValue,
  };

  // check that username and email are not already in use 
  // if true, create an account through insert and send 200
  // if false send response saying something is wrong 

  /* flag determines whether or not there is an error anywhere in the account creation process */
  let flag = true;

  let checkUser = verifyUsername(req.body.username);
  let checkEmail = verifyEmail(req.body.email);

  // checking user and email for validity
  if (!checkUser || !checkEmail) {
    flag = false;
  };

  // verify flag boolean 
  if (!flag) {
    res.status(404).send('IN_USE');
  };

  res.status(200).send(test_token);
});

app.listen(port, () => console.log(`*** app listening on http://localhost:${port}/ ***`));
