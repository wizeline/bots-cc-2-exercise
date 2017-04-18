const sender = require('./Sender');

// Compose the facebook echo message object to our
class Echo {
  composeMessage(messagingEvent){
    if (messagingEvent.message && messagingEvent.message.is_echo) { // Subscribes to Message Echo Callback
      // Indicates the message was sent from the page itself
      return [];
    }
    const message = messagingEvent.message;
    return [this.composeTextMessage(message)];
  }
  composeTextMessage(message) {
    return {
      text: message.text
    };
  }
}

module.exports = new Echo();
