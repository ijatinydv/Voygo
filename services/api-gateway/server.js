const app = require('./app');

const server = require('http').createServer(app);
const { initializeSocket } = require('./socket');

initializeSocket(server);

server.listen(3000, () => {
  console.log('API Gateway listening on port 3000');
});