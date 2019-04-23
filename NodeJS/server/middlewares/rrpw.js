const express= require('express');
const { findEmail, updatePassword } = require('../../db/mongo/models/index');
const { Crypto } = require('../utilities/crypto');

const rrpw = express.Router();

/**
  * Restaurant Reset Password
  * URL: '/rrpw'
  * Headers: { Content-Type: application/json }
  * method: POST
  */
rrpw.route('/rrpw').post((req, res) => {
  let cryptedPassword = new Crypto().encryption(req.body.something);
  updatePassword(req.body.email, cryptedPassword, false).then(result => {
    // redirect to main page or redirect back to login
    res.status(302).redirect('something.html');
  })
});

module.exports = rrpw;