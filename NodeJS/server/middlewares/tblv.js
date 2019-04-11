const express = require('express');
const { connectToRedis } = require('../../db/redis/connection/index');
const { query } = require('../../db/redis/utilities/query');
const { cache } = require('../../db/redis/utilities/cache');
const { retrieveAll } = require('../../db/redis/utilities/retrieveAll');
const { removeKeys } = require('../../db/redis/utilities/remove');

/** Establish redis connection */
const redisClient = connectToRedis();

const tblv = express.Router();

/**
  * Token Black List Verification - blacklisting active JWT tokens after log outs
  * Method: POST
  * Headers: { Content-Type: application/json }
  * Data Params: { JWT: [string] }
  */

tblv.use((req, res, next) => {
  // setting response local variable with opened database connection
  res.locals.connection = redisClient;

  // verify that routed are not for account creation or log-in
  if (req.originalUrl.toLowerCase() === '/rac' || req.originalUrl.toLowerCase() === '/ral') {
    next();
  } else {
    // if user is logging out, black list token into db
    if (req.originalUrl.toLowerCase() === '/ralo') {
      /** Store JWT into redis on user log-out request */
      cache(redisClient, req.body.JWT, req.body.JWT);
      next();
    } else {
    // check redis to see if an JWT is blacklisted - if true, send 401 unauthorized
      const result = query(redisClient, req.body.JWT)
        .then((result) => {
          result === null ? next() : res.status(401).send({ response: 'Unauthorized' });
        });
    }
  }
});

module.exports = tblv;
