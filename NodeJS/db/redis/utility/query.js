const { promisify } = require('util');

exports.query = (connection, key) => {
  const promise = promisify(connection.get).bind(connection);
  return promise(key).then(result => {
    return result;
  });
};