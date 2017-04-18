// const composeInput = require('./inputComposer');

const webhook = () => ({
  /**
   * Validate token
   */
  onGet: (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
      console.log('Validating Facebook webhook');
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error('Failed validation. Make sure the validation tokens match.');
      res.sendStatus(403);
    }
  },
  /**
   * Process Incoming Facebook Message
   */
  onPost: (req, res) => {
    // let data = req.body;

    // // Make sure this is a page subscription
    // if (data.object == 'page') {
    //   // Iterate over each entry
    //   // There may be multiple if batched
    //   data.entry.forEach(function(pageEntry) {
    //     let pageID      = pageEntry.id;
    //     let timeOfEvent = pageEntry.time;

    //     // Iterate over each messaging event
    //     pageEntry.messaging.forEach(function(messagingEvent) {
    //       if(messagingEvent.message) { // Subscribes to Message Received Callback
    //         composeInput(messagingEvent);

    //       } else if(messagingEvent.postback) { // Subscribes to Postback Received Callback
    //         composeInput(messagingEvent);

    //       } else if(messagingEvent.optin) {
    //  Subscribes to Authentication Callback via the Send-to-Messenger Plugin
    //       } else if(messagingEvent.delivery) { // Subscribes to Message Delivered Callback

    //       } else if(messagingEvent.read) { // Subscribes to Message Read Callback

    //       } else {
    //         console.log('Webhook received unknown messagingEvent: ', messagingEvent);
    //       }
    //     });
    //   });
    // }

    // Assume everything went OK.
    //
    // You must send back a 200, within 20 seconds, to let us know you've
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  },
});

module.exports = webhook();
