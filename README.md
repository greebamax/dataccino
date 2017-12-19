### A simple mock server powered by [Express.js](https://github.com/expressjs)
***
### Basic Usage

Specify route to handle requests:
```js
/**
 * @file:route-handler.js
 */
// package provides Chance.js with predefined mixins
const chance = require('dataccino/config/setup-chance');

// package provides some useful helpers
const { Helpers } = require('dataccino/utils');

module.exports = (app, options) => {
  // app - an instance of Express application
  // options - parameters passed to the mock server
  app.get('/some-route', (req, res) => {
    // you can use standard Express API to specify custom handlers
    res.json({
      statusCode: 200,
      response: {
        Helpers.generate(10, chance.word.bind(chance, { syllables: 3 }));
      }
    });
  });
};
```

Combine route handlers:
```js
/**
 * @file:handlers.js
 */
const someRouteHandler = require('path/to/route-handler'); // see above

module.exports = (app, options) => {
  someRouteHandler(app, options);
};
```

And pass handlers as a parameter to the mock server:
```js
const { server } = require('dataccino');
const routes = require('routes.js');

// start mock server
server({
  routes: require('handlers'), // you can specify absolute path to file, it will be required by package
  port: 8888, // specify port
  // any other options which will be passed to the app and can be used in handlers
})
```
