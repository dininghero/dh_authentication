const { DecodeJsonWebToken } = require('../../../server/utilities/decode');
const { retrieveAll } = require('./retrieveAll');

/** 
 * Function is used determine whether blacklisted tokens are expired or valid -- also removes expired tokens
 * @class 
 * @constructor
 * 
 * @method remove
 * @param { Object } connection - database connection
 * @param { Array } expiredTokenList - list of expired blacklisted tokens
 * 
 * @method
 * @param { Object } connection - database connection
 * @return { Object } - object containing list of expired and valid tokens
 */

exports.removeKeys = class removeKeys {
  constructor() {
    this.tokens = {
      expired: [],
      valid: [],
    };
  }

  /** method to remove expired tokens from blacklist */
  remove(connection, expiredTokenList) {
    expiredTokenList.forEach(token => {
      connection.del(token);
    });
  }

  /** method to check tokens and separate valid and expired tokens on the blacklist */
  validateExpiration(connection) {
    const tokenList = retrieveAll(connection).then(result => {
      result.forEach(token => {
        const parsedToken = new DecodeJsonWebToken();
        const contents = parsedToken.readJsonWebToken(parsedToken.decodeBase64Url(token));
        const expired = parsedToken.verifyExpiration(contents);
        if (expired) {
          this.tokens.expired.push(token);
        } else {
          this.tokens.valid.push(token);
        }
      })
    })
    return tokenList;
  }
};

