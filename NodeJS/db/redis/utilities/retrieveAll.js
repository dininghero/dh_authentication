const { promisify } = require('util');

/**
  * Searches redis cache memory for all keys and returns a list
  * @name retrieveAll
  * @function
  * @param {Object} connection
  * @return {Array}
  */

exports.retrieveAll = (connection) => {
  const promise = promisify(connection.keys).bind(connection);
  return promise('*');
};
