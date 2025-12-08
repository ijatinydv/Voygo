const app = require('./app');

const server = require('http').createServer(app);

server.listen(3000, () => {
  console.log('API Gateway listening on port 3000');
});