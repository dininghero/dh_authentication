const { promisify } = require('util');

/** 
 * searches for a specific key and returns the value
 * @function
 * @param { Object } connection
 * @param { String } key
 * @return { Promise } 
 */

exports.query = (connection, key) => {
  const promise = promisify(connection.get).bind(connection);
  return promise(key).then(result => {
    return result;
  });
};