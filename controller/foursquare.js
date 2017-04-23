const messageFormater = require('../utils/messageFormater');
const foursquareUtils = require('../utils/foursquareUtils');

class Foursquare {
  constructor() {
    this.clientID = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRET;
    this.state = 'intro';
    this.states = {
      intro: 'intro',
      location: 'location',
      recommended: 'recommended',
      cuisine: 'cuisine',
      customCuisine: 'customCuisine',
      price: 'price',
      result: 'result',
      repeat: 'repeat',
    };
  }

  intro() {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then(message => {
          this.state = this.states.location;
          resolve(message);
        });
    });
  }

  location() {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then(message => {
          this.state = this.states.recommended;
          resolve(message);
        });
    });
  }

  recommended(location) {
    return new Promise((resolve, reject) => {
      foursquareUtils.setLocation(location);
      messageFormater(this.state)
        .then((message) => {
          message.splice(0, 0, { text: location });
          this.state = this.states.cuisine;
          resolve(message);
        });
    });
  }

  cuisine(query) {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then(message => {
          this.state = this.states.result;
          resolve(message);
        });
    });
  }

  customCuisine(query) {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then(message => {
          foursquareUtils.setQuery(query);
          this.state = this.states.result;
          resolve(message);
        });
    });
  }

  result(query) {
    return new Promise((resolve, reject) => {
      foursquareUtils.setQuery(query);
      foursquareUtils.makeRequest()
        .then((result) => {
          messageFormater('formatResult', result)
            .then((message) => {
              this.state = this.states.repeat;
              resolve(message);
            });
        });
    });
  }

  repeat() {
    return new Promise((resolve, reject) => {
      messageFormater(this.state)
        .then(message => {
          this.state = this.states.location;
          resolve(message);
        });
    });
  }

  processMessage(userMessage) {
    let step = this.states[this.state];
    if (userMessage === 'Other') {
      step = this.states.customCuisine;
      this.state = step;
    }
    return this[step](userMessage);
  }
}

module.exports = Foursquare;
