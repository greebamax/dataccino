const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const delay = require('./middlewares/delay');
const logger = require('./middlewares/logger');
const log = require('./utils/log');

module.exports = (options = {}) => {
  if (!options.routes) {
    log.error(
      log.getMark(),
      'Routes should be provided'
    );

    process.exit(); // eslint-disable-line
  }

  const appRoutes = require(options.routes);
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.all('*', logger);
  app.all('*', delay);

  // register additional routes
  if (options.routes) {
    appRoutes(app, options);
  }

  const port = options.port || 1234;

  // init server
  http.createServer(app).listen(port, () => {
    log.info(
      log.getMark(),
      `Development server is established on http://localhost:${port}`
    );
  });
};
