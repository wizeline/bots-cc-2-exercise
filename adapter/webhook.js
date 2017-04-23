const logger = require('../config/logger');
const sender = require('./sender');
const handler = require('../messageHandler/handler');

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

          if(messagingEvent.isEcho){
            return;
          }

          // By now we are only handling incoming messages
          if (messagingEvent.message || messagingEvent.postback) {
            const message = messagingEvent.message || messagingEvent.postback;
            let messageText;
            if (messagingEvent.message) {
              messageText = message.text;
            } else {
              messageText = message.payload;
            }
            // select what platform we want to use

            switch (messageText) {
              default: {
                handler.GetMessage(messageText)
                  .then((outputMessages) => {
                    // Send each composed message
                    outputMessages.forEach((outputMessage, index) => {
                      setTimeout(() => {
                        sender
                          .sendMessage(userID, outputMessage)
                          .then(logger.info)
                          .catch(logger.error);
                      }, 1000 * index);
                    });
                  });
                break;
              }
            }
          } else {
            // logger.warn('Webhook received unknown messagingEvent: ', messagingEvent);
          }
        });
      });
    }
  },
});

module.exports = Webhook();
