const express = require('express');

const rupr = express.Router();

/**
  * Restaurant Username Password Recovery
  * URL: '/rupr'
  * Method: POST
  * Headers: { Content-Type: application/json }
  * Data Params: {  }
  */
rupr.route('rupr').post((req, res) => {

});

module.exports = rupr;
