
const Foursquare = require('../controller/foursquare');
const Echo = require('../controller/echo');

class Handler {
  constructor() {
    this.controllers = {
      Foursquare: new Foursquare(),
      Echo: new Echo(),
    };
    this.controller = {};
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
