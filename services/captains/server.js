const app = require('./app');

const server = require('http').createServer(app);

server.listen(3003, () => {
  console.log('Captain service listening on port 3003');
});