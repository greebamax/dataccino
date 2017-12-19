const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const log = require('./utils/log');
const file = require('fs');

const logger = require('./middlewares/logger');
const delay = require('./middlewares/delay');

/**
 * @param {String} msg
 */
const throwAnError = msg => {
  log.error(log.getMark(), msg);

  process.exit(1);
};

module.exports = (options = {}) => {
  if (!options.routes) {
    throwAnError('Routes should be provided');
  }

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.all('*', logger);
  app.all('*', delay);

  let appRoutes;

  switch (typeof options.routes) {
    case 'string':
      if (!file.existsSync(options.routes)) {
        throwAnError('The file containing an additional routes should exist');
      }

      appRoutes = require(options.routes);

      break;

    case 'function':
      appRoutes = options.routes;
      break;

    default:
      throwAnError('Routes should be a string path to file or function representing module exports');
  }

  // register additional routes
  appRoutes(app, options);

  const port = options.port || 1234;

  // init server
  http.createServer(app).listen(port, () => {
    log.info(
      log.getMark(),
      `Server is established on http://localhost:${port}`
    );
  });
};
