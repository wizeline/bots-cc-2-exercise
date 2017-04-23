const messageFormater = require('../utils/messageFormater');
const foursquareUtils = require('../utils/foursquareUtils');
const wit = require('../adapter/wit');
const witParser = new wit();

class Foursquare {
  constructor() {
    this.clientID = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRET;
    this.state = 'intro';
  }

  _intro() {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then((message) => {
          this.state = 'location';
          resolve(message);
        });
    });
  }

  _location() {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then((message) => {
          this.state = 'recommended';
          resolve(message);
        });
    });
  }

  _recommended(location) {
    return new Promise((resolve, reject) => {
      foursquareUtils.setLocation(location);
      messageFormater(this.state)
        .then((message) => {
          message.splice(0, 0, { text: location });
          this.state = 'cuisine';
          resolve(message);
        });
    });
  }

  _cuisine() {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then((message) => {
          this.state = 'result';
          resolve(message);
        });
    });
  }

  _customCuisine(query) {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then((message) => {
          foursquareUtils.setQuery(query);
          this.state = 'result';
          resolve(message);
        });
    });
  }

  _result(query) {
    return new Promise((resolve, reject) => {
      foursquareUtils.setQuery(query);
      foursquareUtils.makeRequest()
        .then((result) => {
          messageFormater('formatResult', result)
            .then((message) => {
              this.state = 'repeat';
              resolve(message);
            });
        });
    });
  }

  _repeat() {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then((message) => {
          this.state = 'location';
          resolve(message);
        });
    });
  }

  // NLP States
  _parse(freeText) {
    return new Promise((resolve, reject) => {
      witParser.processMessage(freeText).then((witResult) => {
        console.log(JSON.stringify(witResult, null, 2));
      });
    });
  }

  processMessage(userMessage) {
    let step = `_${this.state}`;
    if (step === '_location' && userMessage != "Let's do this!") {
      step = '_parse';
      this.state = 'parse';
    } else if (userMessage === 'Other') {
      step = '_customCuisine';
      this.state = step;
    }
    return this[step](userMessage);
  }
}

module.exports = Foursquare;
