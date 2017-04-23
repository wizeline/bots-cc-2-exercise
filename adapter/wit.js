const WitLib  = require('node-wit').Wit;

class Wit {
  constructor() {
    this.wit = new WitLib({accessToken: process.env.WIT_TOKEN});
  }

  processMessage(message) {
    return this.wit.message(message, {});
  }
}

module.exports = Wit;