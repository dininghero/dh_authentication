const { promisify } = require('util');

exports.retrieveAll = connection => {
  const promise = promisify(connection.keys).bind(connection);
  return promise('*').then(result => result);
}