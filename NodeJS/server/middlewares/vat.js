const express = require('express');

const DecodeJsonWebToken = require('../utilities/decode');

const vat = express.Router();

/**
  * Restaurant Verify Account Token
  * URL: '/vat'
  * Method: POST
  * Data Params:
  */
vat.route('/vat').post((req, res) => {
});

module.exports = vat;
