const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
  });
};
