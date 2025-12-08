const app = require('./app');

const server = require('http').createServer(app);

server.listen(3002, () => {
  console.log('Ride service listening on port 3002');
});