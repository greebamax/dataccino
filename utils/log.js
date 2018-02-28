const format = require('util').format;
const styles = require('chalk');
const log = console.log; // eslint-disable-line

const levels = {
  debug: styles.bold.blue,
  info: styles.white,
  warn: styles.keyword('orange'),
  error: styles.bold.red,
  data: styles.italic,
};

function getLogger() {
  const logger = module.exports;

  Object.keys(levels).forEach(function(level) {
    logger[level] = logMessage.bind(this, level);
  });

  return logger;
}

function logMessage(level, msg, ...rest) {
  if (typeof msg === 'string') {
    msg = format.apply(null, [msg, ...rest]);
  }

  return log(levels[level](msg));
}

const logger = getLogger();

module.exports = Object.assign(logger, {
  getMark: mark => styles`{white [}{green ${mark || 'mock-server'}}{white ]}`,
  styles,
});
