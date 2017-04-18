const rp = require('request-promise');

class Sender {
  sendMessage(recipientId, message) {
    this.messageData = {
      recipient: {
        id: recipientId,
      },
      message,
    };
    return this.callSendAPI();
  }
  callSendAPI() {
    const options = {
      uri: `${process.env.FB_GRAPH_API}/me/messages`,
      qs: {
        access_token: process.env.FB_PAGE_ACCESS_TOKEN,
      },
      method: 'POST',
      json: this.messageData,
    };
    return rp(options);
  }
}

module.exports = new Sender();