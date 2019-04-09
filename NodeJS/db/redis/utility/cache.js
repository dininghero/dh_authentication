/**
 * Saves a key/value pair in volatile memory using redis 
 * @function 
 * @param { Object } connection 
 * @param { String } key 
 * @param { String } value 
 * @return { Promise }
 */

exports.cache = (connection, key, value) => {
  return new Promise((resolve, reject) => {
    resolve(connection.set(key, value))
  })
};
