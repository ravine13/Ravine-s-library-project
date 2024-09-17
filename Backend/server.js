const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router); // Ensure this matches the endpoint you want
server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});
