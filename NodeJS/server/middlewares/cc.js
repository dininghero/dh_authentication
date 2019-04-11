const express = require('express');

const cc = express.Router();

/**
  * Csrf Check - verifying that header and body csrf tokens are matching
  * before reaching any endpoints
  * Headers: { Content-Type: application/json }
  * Data Params: {  }
  */
cc.use((req, res, next) => {
  /** need to compare the header store csrf token and the one encrypted in the
  JWT body and see if they match */
  if (req.originalUrl.toLowerCase() === 'rac' || req.originalUrl.toLowerCase() === 'ral') {
    next();
  } else {
    /** Checks header and JWT payload for matching tokens  */
    req.header.access_token === res.locals.xsrfToken ? next() : res.status(401).send({response: 'Unauthorized.'});
  }
});

module.exports = cc;
