require('dotenv').load();

// Dependencies

const express = require('express');
const configExpress = require('./config/express');
const api = require('./api');

// Setup server.

const app = express();
configExpress(app);

// Creating REST API
app.use('/', api);

const server = app.listen(process.env.PORT);
console.log(`Magic happens on port ${process.env.PORT}`);

const host = server.address().address;
const port = server.address().port;
console.log(`=> Bot Boilerplate starting on http://${host}:${port}`);
console.log('=> Ctrl-C to shutdown server');

module.exports = app;
