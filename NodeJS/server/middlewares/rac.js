const express = require('express');

const { createAccount } = require('../../db/mongo/models/index');
const { verifyContent } = require('../utilities/verify');
const { Crypto } = require('../utilities/crypto');
const { ValidateAccountField } = require('../utilities/validateAccountField');

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

  /** Validating data before inserting into database */
  const validation = new ValidateAccountField();

  validation.validateName(firstname, 'first');
  validation.validateName(lastname, 'last');
  validation.validateEmail(email);
  validation.validatePassword(pw);

  if (!validation.pw || !validation.email || !validation.lastName || !validation.firstName) {
    res.status(400).send({
      response: 'Couldn\'t create account',
      error: 'String validation failed',
    });
  }

  verifyContent({ email: email })
    .then((result) => {
      /** Checks returned token, if false, send 409 conflit */
      if (!result) {
        res.status(409).send({
          response: 'Email already exist',
        });
      } else {
        /** Else encrypt password and create a new account */
        const encrypted = new Crypto(pw).encryption(pw);

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
