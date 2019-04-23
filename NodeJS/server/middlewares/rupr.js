const express = require('express');
const { findEmail } = require('../../db/mongo/models/index');  
const { sendEmail } = require('../utilities/email');
const { randomPasswordGenerator } = require('../utilities/generatePassword');
const { Crypto } = require('../utilities/crypto');
const { updatePassword } = require('../../db/mongo/models/index');

const rupr = express.Router();

/**
  * Restaurant Username Password Recovery
  * URL: '/rupr'
  * Method: POST
  * Headers: { Content-Type: application/json }
  * Data Params: {  }
  */

rupr.route('/rupr').get((req, res) => {
  findEmail(req.body.email).then(result => {
    if (result.length > 0) {
      const randomPassword = randomPasswordGenerator(8);
      const encryptedPassword = new Crypto().encryption(randomPassword);
      
      console.log(randomPassword) // remove this
      updatePassword(req.body.email, encryptedPassword).then(result => {
        sendEmail(req.body.email, randomPassword);
        res.status(200).send({
          response: 'Success'
        })
      })
    } else {
      res.status(404).send({
        response: 'Not Found'
      })
    }
  });
});

module.exports = rupr;
