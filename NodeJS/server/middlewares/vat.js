const express = require('express');
require('dotenv').config();

const { DecodeJsonWebToken } = require('../utilities/decode');

const vat = express.Router();

/**
  * Restaurant Verify Account Token
  * URL: '/vat'
  * Method: POST
  * Headers: { Content-Type: application/json }
  * Data Params: { JTW: [string] }
  */
vat.route('/vat').post((req, res) => {
  const { JWT } = req.body;

  const decodeJWT = new DecodeJsonWebToken();

  const isAuth = decodeJWT.authenticateJWT(JWT, process.env.CURRENT_KEY);

  if (isAuth) {
    res.status(200).send({ response: 'Token Verified', isAuth });
  }
  res.status(401).send({ response: 'Unauthorized', isAuth });
});

module.exports = vat;
