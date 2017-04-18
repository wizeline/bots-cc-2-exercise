require('dotenv').load();

// Dependencies

const express = require('express');
const configExpress = require('./config/express');
const logger = require('./config/logger');
const api = require('./api');


// Setup server.

const app = express();
configExpress(app);

// Creating REST API
app.use('/', api);

const server = app.listen(process.env.PORT);
logger.info(`Magic happens on port ${process.env.PORT}`);

const host = server.address().address;
const port = server.address().port;
logger.info(`=> Bot Boilerplate starting on http://${host}:${port}`);
logger.info('=> Ctrl-C to shutdown server');

module.exports = app;
