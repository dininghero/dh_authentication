const express = require('express');
require('dotenv').config();

const { verifyPassword } = require('../utilities/verify');
const { JsonWebToken } = require('../utilities/jwt');

const ral = express.Router();

/**
  * Restaurant Account Log-in
  * URL: '/ral'
  * Method: POST
  * Headers: { Content-Type: application/json }
  * Data Params: { email: [string], pw: [string] }
  */

ral.route('/ral').post((req, res) => {
  verifyPassword(req.body)
    .then((result) => {
      if (result === null) {
        res.status(404).send({
          response: 'Account not found',
        });
      } else if (result) {
        /** instantiate new JWT */
        const JSONWebToken = new JsonWebToken();

        /** Decorate header and payload */
        JSONWebToken.addAlgorithm('HS256');
        JSONWebToken.addEmail(req.body.email);
        JSONWebToken.addAdministratorStatus(false);
        JSONWebToken.addExpiration(1);
        JSONWebToken.addXSRFToken(res.locals.csrf);

        /** Generate signed Json Web Token */
        JSONWebToken.generateSignedToken(
          JSONWebToken.header, JSONWebToken.payload, process.env.CURRENT_KEY,
        );

        res.status(200).send({
          response: 'Success!',
          payload: JSONWebToken.base64UrlToken,
        });
      } else {
        res.status(401).send({
          response: 'Unauthorized',
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        response: 'Couldn\'t process request',
        error: err.message,
      });
    });
});

module.exports = ral;
