/**
  * Saves a key/value pair in volatile memory using redis
  * @name cache
  * @function
  * @param {Object} connection
  * @param {String} key
  * @param {String} value
  * @return {Promise}
  */

exports.cache = (connection, key, value) => new Promise((resolve, reject) => {
  resolve(connection.set(key, value));
});
