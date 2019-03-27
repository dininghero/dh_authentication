const express = require('express');

const ralo = express.Router();

/**
  * Restaurant Account Restaurant Log-Out
  * URL: '/ralo'
  * Method: POST
  * Headers: { Content-Type: application/json }
  * Data Params:
  */
ralo.route('/ralo').post((req, res) => {
  res.send('/ralo');
});

module.exports = ralo;
