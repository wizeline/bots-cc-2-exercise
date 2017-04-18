const Router = require('express').Router;
const webhook = require('../controller/webhook');

const router = new Router();

router.route('/')
  .get((req, res) => res.send({ message: 'Welcome to Bot\'s Crash Course Volume 2' }));

router.route('/webhook')
  .get((...args) => webhook.onGet(...args))
  .post((...args) => webhook.onPost(...args));

module.exports = router;
