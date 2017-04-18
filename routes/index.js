module.exports = (app) => {
  // Set routes for the API using respective namespaces and routers.

  app.get('/', (req, res) => {
    res.send({ message: 'Welcome to Bot\'s Crash Course Volume 2' });
  });
};
