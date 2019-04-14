const express = require('express');
const { RemoveKeys } = require('../../db/redis/utilities/remove');

const ec = express.Router();

/**
  * Expiration Check - Checks token blacklist for expired tokens and removed them from redis
  * Headers: { Content-Type: application/json }
  */

ec.use((req, res, next) => {
  const redisClient = res.locals.connection;
  const tokenStatus = new RemoveKeys();
  const tokenList = new Promise((resolve, reject) => {
    resolve(tokenStatus.validateExpiration(redisClient));
  })
    .then((next) => {
      tokenStatus.remove(redisClient, tokenStatus.tokens.expired);
    })
    .catch(err => console.log(err));

  next();
});

module.exports = ec;
