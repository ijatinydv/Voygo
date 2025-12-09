const app = require('./app');

const server = require('http').createServer(app);

server.listen(3003, () => {
  console.log('Ride service listening on port 3003');
});