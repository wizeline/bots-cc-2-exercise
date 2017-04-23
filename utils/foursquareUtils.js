const requestPromise = require('request-promise');

class FoursquareUtils {
  constructor() {
    this.params = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      v: '20170410',
    };
  }

  setLocation(location) {
    this.params.near = location;
  }

  setQuery(query) {
    this.params.query = query;
  }

  makeRequest() {
    console.log(this.params);
    const requestOptions = {
      method: 'GET',
      uri: process.env.FOURSQUARE_API,
      qs: this.params,
      json: true,
    };
    return requestPromise(requestOptions);
  }
}

module.exports = new FoursquareUtils();
