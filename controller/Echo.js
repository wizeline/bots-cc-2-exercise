// Compose the facebook echo message object to our
class Echo {
  composeMessage(messagingEvent) {
    if (messagingEvent.message && messagingEvent.message.is_echo) {
      // Subscribes to Message Echo Callback
      // Indicates the message was sent from the page itself
      return [];
    }
    this.message = messagingEvent.message;
    return [this.composeTextMessage()];
  }
  composeTextMessage() {
    return {
      text: this.message.text,
    };
  }
}

module.exports = new Echo();
