const app = require('./app');

const server = require('http').createServer(app);

server.listen(3002, () => {
  console.log('Captain service listening on port 3002');
});