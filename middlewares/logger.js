/**
 * Logger middleware
 */
const log = require('../utils/log');
const colors = require('chalk');

module.exports = (request, response, next) => {
  log.data(
    colors.yellow('Handle route:'),
    colors.magenta(request.headers.host + request.url)
  );
  next();
};
