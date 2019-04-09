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
  // res.status(200).send({
  //   response: 'Sucessful Log-out.'
  // });
  res.status(302).redirect() // redirect to log in page
});

module.exports = ralo;
