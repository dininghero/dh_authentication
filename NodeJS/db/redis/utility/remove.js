const { DecodeJsonWebToken } = require('../../../server/utilities/decode');
const { retrieveAll } = require('./retrieveAll');

exports.removeKeys = class removeKeys {
  constructor() {
    this.tokens = {
      expired: [],
      valid: [],
    };
  }

  remove(connection, expiredTokenList) {
    expiredTokenList.forEach(token => {
      connection.del(token);
    });
  }

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

