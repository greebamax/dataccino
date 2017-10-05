const { server } = require('../index');
const path = require('path');

server({
  routes: path.resolve(__dirname, './routes.js')
});
