const WitLib  = require('node-wit').Wit;

class Wit {
  constructor() {
    this.wit = new WitLib({accessToken: process.env.WIT_TOKEN});
  }

  processMessage(session, message) {
    return this.wit.message(message, session.context)
  }
}

module.exports = Wit;