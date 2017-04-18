const Router = require('express').Router;
const Webhook = require('../controller/webhook');

const router = new Router();

router.route('/')
  .get((req, res) => res.send({ message: 'Welcome to Bot\'s Crash Course Volume 2' }));

router.route('/webhook')
  .get((...args) => Webhook.onGet(...args))
  .post((...args) => Webhook.onPost(...args));

module.exports = router;
