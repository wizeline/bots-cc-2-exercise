// const composeInput = require('./inputComposer');
const logger = require('../config/logger');

const webhook = () => ({
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
    const data = req.body;
    logger.info(JSON.stringify(data, null, 2));
    // Basic Message Payload
    // {
    //   "object": "page",
    //   "entry": [
    //     {
    //       "id": "687617881386521",
    //       "time": 1492486513827,
    //       "messaging": [
    //         {
    //           "sender": {
    //             "id": "1193548610706791"
    //           },
    //           "recipient": {
    //             "id": "687617881386521"
    //           },
    //           "timestamp": 1492486504700,
    //           "message": {
    //             "mid": "mid.$cAAIrka1UWPZhsGYI_FbfyDAxDyk-",
    //             "seq": 240861,
    //             "text": "hey"
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // }

    // Make sure this is a page subscription
    if (data.object === 'page') {
      // Iterate over each entry
      // There may be multiple if batched
      data.entry.forEach((entry) => {
        // let pageID = entry.id;
        // let timeOfEvent = entry.time;

        // Iterate over each messaging event
        entry.messaging.forEach((messaging) => {
          if (messaging.message) {
            const messageText = messaging.message.text;
            switch (messageText) {
              default:
                break;
            }
            // Subscribes to Message Received Callback
            // composeInput(messaging);
          } else if (messaging.postback) {
            // Subscribes to Postback Received Callback
            // composeInput(messaging);

          } else if (messaging.optin) {
            // Subscribes to Authentication Callback via the Send-to-Messenger Plugin

          } else if (messaging.delivery) {
            // Subscribes to Message Delivered Callback

          } else if (messaging.read) { // Subscribes to Message Read Callback

          } else {
            console.log('Webhook received unknown messaging: ', messaging);
          }
        });
      });
    }

    // Assume everything went OK.
    //
    // You must send back a 200, within 20 seconds, to let us know you've
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  },
});

module.exports = webhook();
