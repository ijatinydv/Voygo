const app = require('./app');
const server = require('http').createServer(app);

server.listen(3001, () => {
  console.log('User service listening on port 3001');
});