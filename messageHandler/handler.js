const Echo = require('../controller/echo');

class Handler {
  constructor() {
    this.controllers = {
      Echo: new Echo(),
    };
    this.controller = this.controllers[process.env.BOT_PLUGIN];
    this.testvalue = 0;
  }

  SelectController(selectedController) {
    this.controller = this.controllers[selectedController];
  }

  GetMessage(message) {
    return this.controller.processMessage(message);
  }
}

module.exports = new Handler();
