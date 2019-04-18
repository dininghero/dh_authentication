/**
 * Function that checks that csrf tokens match and returns a boolean value - used in all end points that take form submissions
 * @function
 * @param {String} csrf - token taken from request header
 * @param {String} jwt - token take from body of JWT
 * @return {Boolean} 
 */

exports.verifyCSRF = (csrf, jwt) => {
  // take csrf out of header and csrf out of the jwt and compare values
  return csrf === jwt ? true : false;
};