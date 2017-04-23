const templates = require('./templates');
/**
 * Function to get the output text based on
 * the current state of the aplication
 */
module.exports = (state, venues = undefined) => {
  // Get default text from template
  let rawMessage;
  if (venues) {
    rawMessage = templates[state](venues);
  } else {
    rawMessage = templates[state];
  }

  const formattedMessage = [];
  return new Promise((resolve, reject) => {
    Object.keys(rawMessage).forEach((key) => {
      switch (key) {

        case 'text': {
          rawMessage[key].forEach((text) => {
            formattedMessage.push({ text });
          });
          break;
        }

        case 'button': {
          const quickReplies = [];
          rawMessage[key].forEach((reply) => {
            quickReplies.push({
              content_type: 'text',
              title: reply.title,
              payload: reply.payload,
            });
          });

          // Remove last text to use it as button text
          const lastMessage = formattedMessage.pop().text;
          formattedMessage.push({
            text: lastMessage,
            quick_replies: quickReplies,
          });
          break;
        }
      }
    });
    resolve(formattedMessage);
  });
};
