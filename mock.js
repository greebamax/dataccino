var nock = require('nock');

console.log('Mock server is running..');

var scope = nock(/example\.com/)
      .get('/resource')
      .reply(200, 'domain regex matched');
