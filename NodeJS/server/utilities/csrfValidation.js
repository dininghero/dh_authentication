/**
 * @function
 * @param {String} token1 - request header - req.headers.cookie 
 * @param {String} token2 - jwt body xsrf token - res.locals.xsrfToken
 * @return {Boolean}
 */

exports.validateCSRF = (token1, token2) => {
  return (token1 === token2) ? true : false;
};