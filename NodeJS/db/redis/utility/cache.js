exports.cache = (connection, key, value) => {
  return new Promise((resolve, reject) => {
    resolve(connection.set(key, value))
  })
};
