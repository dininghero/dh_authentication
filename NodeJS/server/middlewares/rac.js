const express = require('express');

const { createAccount } = require('../../db/mongo/models/index');
const { verifyContent } = require('../utilities/verify');
const { _crypto } = require('../utilities/crypto');

const rac = express.Router();

/**
  * Restaurant Account Creation
  * URL: '/rac'
  * Method: POST
  * Headers: { Content-Type: application/json }
  * Data Params: { email: [string], pw: [string], firstname: [string], lastname: [string] }
  */
rac.route('/rac').post((req, res) => {
  const {
    firstname, lastname, email, pw,
  } = req.body;

  verifyContent({ email: email })
    .then((result) => {
      /** Checks returned token, if false, send 409 conflit */
      if (!result) {
        res.status(409).send({
          response: 'Email already exist',
        });
      } else {
        /** Else encrypt password and create a new account */
        const encrypted = new _crypto(pw).encryption(pw);

        /** Token for database entry */
        const newUser = {
          firstname: firstname,
          lastname: lastname,
          pw: encrypted.hash,
          salt: encrypted.salt,
          email: email,
        };

        /** Insert entry into database */
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

module.exports = rac;
