// Compose the facebook echo message object
class Echo {
  processMessage(message) {
    return new Promise((resolve, reject) => {
      const outputMessage = { text: message };
      resolve([outputMessage]);
    });
  }
}

module.exports = Echo;
