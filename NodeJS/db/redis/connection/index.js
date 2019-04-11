const redis = require('redis');
const chalk = require('chalk');

const redisURL = 'redis://127.0.0.1:6379';
const client = redis.createClient();

const disconnectRedis = () => client.quit();

exports.connectToRedis = () => {
  /**
    * Disconnect Redis when Node.js process receives termination signal
    */
  process
    .on('SIGINT', disconnectRedis)
    .on('SIGTERM', disconnectRedis);

  return client
    .on('connect', () => console.log(chalk.magenta(`* Redis server is connected: ${redisURL}`)))
    .on('reconnecting', () => console.log(chalk.magenta('* Redis server is reconnecting')))
    .on('end', () => console.log(chalk.magenta('* Redis server connection closed')))
    .on('error', err => console.log(chalk.red(`* Redis server error: ${err}`)));
};
