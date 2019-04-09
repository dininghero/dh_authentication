const express = require('express');
const { removeKeys } = require('../../db/redis/utility/remove');

const ec = express.Router();

/**
  * Expiration Check - Checks token blacklist for expired tokens and removed them from redis
  * Headers: { Content-Type: application/json }
  */
ec.use((req, res, next) => { 
  const redisClient = res.locals.connection;
  const tokenStatus = new removeKeys();
  const tokenList = new Promise((resolve, reject) => {
    resolve(tokenStatus.validateExpiration(redisClient));
  })
  .then(next => {
    console.log(tokenStatus); //remove this 
    tokenStatus.remove(redisClient, tokenStatus.tokens.expired);
  })
  .catch(err => {
    if (err) throw err;
  });

  next();
});

module.exports = ec;