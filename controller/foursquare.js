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
        const entities = witResult.entities;
        if (Object.keys(entities).length == 0) {
          this.state = 'location';
          this['_location']().then((message) => resolve(message));
        } else {
          let missing;
          if (entities.location) {
            foursquareUtils.setLocation(entities.location[0].value);
          } else {
            missing = true;
            this.state = "location";
            messageFormater(this.state)
              .then((message) => {
                this.state = 'resultLocation';
                resolve(message);
              });
          }
          if (entities.query) {
            foursquareUtils.setQuery(entities.query[0].value);
          } else {
            missing = true;
            this.state = recommended;
            messageFormater(this.state)
              .then((message) => {
                message.splice(0, 0, { text: entities.location[0].value});
                this.state = 'cuisine';
                resolve(message);
              });
          }

          if (!missing) {
            foursquareUtils.makeRequest()
            .then((result) => {
              messageFormater('formatResult', result)
                .then((message) => {
                  this.state = 'repeat';
                  resolve(message);
                });
            });
          }
        }
      });
    });
  }

  _resultLocation(location) {
    return new Promise((resolve, reject) => {
      foursquareUtils.setLocation(location);
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
