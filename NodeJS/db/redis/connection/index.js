const redis = require('redis');

const connectToRedis = () => {
  const client = redis.createClient();
  return client.on('connect', () => console.log('Redis Client is Connected'));
};

const disconnectRedis = (connection) => {
  console.log('Redis connection terminated gracefully');
  connection.quit();
  process.exit(0);
};

module.exports = {
  connectToRedis,
  disconnectRedis,
};