const express = require('express');
const { findEmail, updatePassword } = require('../../db/mongo/models/index');

const ctpw = express.Router();


/**
  * Check Temporary Password
  * URL: '/ctpw'
  * Headers: { Content-Type: application/json }
  */

ctpw.use((req, res, next) => {
  if (req.originalUrl.toLowerCase() === '/ral') {
    findEmail(req.body.email).then (result => {
      if (result.length > 0) {
        if (result[0].tempPassword) {
          // res.status(302).redirect('something.html');
          next(); //remove this; testing only
        } else {
          next();
        }
      }
    })
  } else {
    next();
  }
});

module.exports = ctpw;