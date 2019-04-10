const express = require('express');
const dotenv = require('dotenv');
const { parsed } = dotenv.config({ debug: true });

const { DecodeJsonWebToken } = require('../utilities/decode');

const vat = express.Router();

/**
  * Restaurant Verify Account Token
  * URL: '/vat'
  * Method: POST
  * Headers: { Content-Type: application/json }
  * Data Params: { JWT: [string] }
  */
 vat.use((req, res, next) => {
  // By JWT verification if a user is attempting to create an account or authenticate
  if (req.originalUrl.toLowerCase() === '/ral' || req.originalUrl.toLowerCase() === '/rac') {
    next();
  } else {
    const decodeToken = new DecodeJsonWebToken();
    
    /** uncomment to test updates to CURRENT_KEY for JWT validation */
    // parsed.CURRENT_KEY = 'test';
    // process.env.CURRENT_KEY = parsed.CURRENT_KEY;

    if (decodeToken.authenticateJWT(req.body.JWT, process.env.CURRENT_KEY)) {
      const parsedJWT = decodeToken.readJsonWebToken(decodeToken.decodeBase64Url(req.body.JWT));
      const expired = decodeToken.verifyExpiration(parsedJWT);
      if (expired) {
        // use res.render to send fail and a html file
        res.status(401).send({
          response: 'Unauthorized.'
        });
      } else {
        res.locals.xsrfToken = JSON.parse(parsedJWT.payload).xsrfToken;
        next();
      }
    } else {
      // use res.render to send fail and a html file
      res.status(401).send({
        response: 'Unauthorized.'
      });
    };
  }
});

module.exports = vat;
