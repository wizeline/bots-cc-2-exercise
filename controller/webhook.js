const logger = require('../config/logger');
const Echo = require('./Echo');
const Sender = require('./Sender');

const Webhook = () => ({
  /**
   * Validate token
   */
  onGet: (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
      logger.info('Validating Facebook webhook');
      res.status(200).send(req.query['hub.challenge']);
    } else {
      logger.error('Failed validation. Make sure the validation tokens match.');
      res.sendStatus(403);
    }
  },
  /**
   * Process Incoming Facebook Message
   */
  onPost: (req, res) => {
    const body = req.body;
    // Assume everything went OK.
    //
    // You must send back a 200, within 20 seconds, to let us know you've
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);

    // Make sure this is a page subscription
    if (body.object === 'page') {
      // Iterate over each entry
      // There may be multiple if batched
      body.entry.forEach((entry) => {
        entry.messaging.forEach((messagingEvent) => {
          const userID = messagingEvent.sender.id;
          let messages = [];

          // By now we are only handling incoming messages
          if (messagingEvent.message) {
            const message = messagingEvent.message;
            const messageText = message.text;
            switch (messageText) {
              default: {
                messages = Echo.composeMessage(messagingEvent);
                break;
              }
            }
          } else {
            // logger.warn('Webhook received unknown messagingEvent: ', messagingEvent);
          }

          // Send each composed message
          messages.forEach((message) => {
            Sender
              .sendMessage(userID, message)
              .then(logger.info)
              .catch(logger.error);
          });
        });
      });
    }
  },
});

module.exports = Webhook();
