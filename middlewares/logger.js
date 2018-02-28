/**
 * Logger middleware
 */
const log = require('../utils/log');

module.exports = (request, response, next) => {
  log.info(
    log.getMark(),
    log.styles`{yellow Handle route:}`,
    log.styles`{magenta ${request.headers.host}${request.url}}`
  );
  next();
};
