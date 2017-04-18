const winston = require('winston');
const fs = require('fs');

const path = __dirname.split('/config')[0];

const verifyDirectory = (done) => {
  const dir = 'logs/';
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, done);
  } else {
    done();
  }
};

const init = () => verifyDirectory(err => err && winston('debug', 'Error! - logs folder wasn\'t created', err));

init();

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'error',
      filename: `${path}/logs/error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      name: 'info',
      filename: `${path}/logs/info.log`,
      level: 'info',
    }),
    new winston.transports.File({
      name: 'warn',
      filename: `${path}/logs/warn.log`,
      level: 'warn',
    }),
    new winston.transports.Console({
      level: 'debug',
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: true,
    }),
  ],
});

module.exports = logger;
