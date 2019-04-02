const express = require('express');

const { createAccount } = require('../../db/mongo/models/index');
const { verifyContent } = require('../utilities/verify');
const { _crypto } = require('../utilities/crypto');

const rac = express.Router();

/**
  * Restaurant Account Creation
  * URL: '/rac'
  * Method: POST
  * Data Params: { email: [string], pw: [string], restaurant: [string] }
  */
rac.route('/rac').post((req, res) => {
  verifyContent(req.body)
    .then((result) => {
      /** Checks returned token for any false values and if there are, send 409 conflit */
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
        /** Else encrypt password and create a new account */
        const encrypted = new _crypto(req.body.pw).encryption(req.body.pw);

        /** Token for database entry */
        const newUser = {
          restaurant: req.body.restaurant,
          pw: encrypted.hash,
          salt: encrypted.salt,
          email: req.body.email,
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
