// Compose the facebook Sample messages object
class SampleOutputs {
  static composeButtonMessage() {
    return [{
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'This is test text',
          buttons: [{
            type: 'web_url',
            url: 'https://www.oculus.com/en-us/rift/',
            title: 'Open Web URL',
          }, {
            type: 'postback',
            title: 'Trigger Postback',
            payload: 'DEVELOPED_DEFINED_PAYLOAD',
          }, {
            type: 'phone_number',
            title: 'Call Phone Number',
            payload: '+16505551234',
          }],
        },
      },
    }];
  }
  static composeImageMessage() {
    return [{
      attachment: {
        type: 'image',
        payload: {
          url: `${process.env.BACKEND_URL}/assets/rift.png`,
        },
      },
    }];
  }
  static composeGifMessage() {
    return [{
      attachment: {
        type: 'image',
        payload: {
          url: `${process.env.BACKEND_URL}/assets/instagram_logo.gif`,
        },
      },
    }];
  }
  static composeAudioMessage() {
    return [{
      attachment: {
        type: 'audio',
        payload: {
          url: `${process.env.BACKEND_URL}/assets/sample.mp3`,
        },
      },
    }];
  }
  static composeVideoMessage() {
    return [{
      attachment: {
        type: 'video',
        payload: {
          url: `${process.env.BACKEND_URL}/assets/allofus480.mov`,
        },
      },
    }];
  }
  static composeQuickReplyMessage() {
    return [{
      text: 'Select or write the type of message you want to test...',
      quick_replies: [{
        content_type: 'text',
        title: 'Button',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_BUTTON',
      }, {
        content_type: 'text',
        title: 'Image',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_IMAGE',
      }, {
        content_type: 'text',
        title: 'Gif',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GIF',
      }, {
        content_type: 'text',
        title: 'Audio',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_AUDIO',
      }, {
        content_type: 'text',
        title: 'Video',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_VIDEO',
      }, {
        content_type: 'text',
        title: 'Quick Reply',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_QUICK_REPLY',
      }, {
        content_type: 'text',
        title: 'Receipt',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RECEIPT',
      }, {
        content_type: 'text',
        title: 'Single Card',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_SINGLE_CARD',
      }, {
        content_type: 'text',
        title: 'Card Array',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_CARD_ARRAY',
      }, {
        content_type: 'text',
        title: 'ECHO',
        payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ECHO',
      }],
    }];
  }
  static composeSingleCardMessage() {
    return [{
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: 'Oculus Rift Card',
            image_url: `${process.env.BACKEND_URL}/assets/rift.png`,
            subtitle: 'We\'ve got the right hat for everyone.',
            buttons: [{
              type: 'web_url',
              url: 'https://www.oculus.com/en-us/rift/',
              title: 'Open Web URL',
            }, {
              type: 'postback',
              title: 'Trigger Postback',
              payload: 'DEVELOPED_DEFINED_PAYLOAD',
            }, {
              type: 'phone_number',
              title: 'Call Phone Number',
              payload: '+16505551234',
            }],
          }],
        },
      },
    }];
  }
  static composeCardArrayMessage() {
    return [{
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: 'Oculus Rift Card 1',
            image_url: `${process.env.BACKEND_URL}/assets/rift.png`,
            subtitle: 'We\'ve got the right hat for everyone.',
            buttons: [{
              type: 'web_url',
              url: 'https://www.oculus.com/en-us/rift/',
              title: 'Open Web URL',
            }, {
              type: 'postback',
              title: 'Trigger Postback',
              payload: 'DEVELOPED_DEFINED_PAYLOAD',
            }, {
              type: 'phone_number',
              title: 'Call Phone Number',
              payload: '+16505551234',
            }],
          }, {
            title: 'Oculus Rift Card 2',
            image_url: `${process.env.BACKEND_URL}/assets/gearvrsq.png`,
            subtitle: 'We\'ve got the right hat for everyone.',
            buttons: [{
              type: 'web_url',
              url: 'https://www.oculus.com/en-us/rift/',
              title: 'Open Web URL',
            }, {
              type: 'postback',
              title: 'Trigger Postback',
              payload: 'DEVELOPED_DEFINED_PAYLOAD',
            }, {
              type: 'phone_number',
              title: 'Call Phone Number',
              payload: '+16505551234',
            }],
          }],
        },
      },
    }];
  }
  static composeReceiptMessage() {
    const receiptId = `order${Math.floor(Math.random() * 1000)}`;
    return [{
      attachment: {
        type: 'template',
        payload: {
          template_type: 'receipt',
          recipient_name: 'Peter Chang',
          order_number: receiptId,
          currency: 'USD',
          payment_method: 'Visa 1234',
          timestamp: '1428444852',
          elements: [{
            title: 'Oculus Rift',
            subtitle: 'Includes: headset, sensor, remote',
            quantity: 1,
            price: 599.00,
            currency: 'USD',
            image_url: `${process.env.BACKEND_URL}/assets/riftsq.png`,
          }, {
            title: 'Samsung Gear VR',
            subtitle: 'Frost White',
            quantity: 1,
            price: 99.99,
            currency: 'USD',
            image_url: `${process.env.BACKEND_URL}/assets/gearvrsq.png`,
          }],
          address: {
            street_1: '1 Hacker Way',
            street_2: '',
            city: 'Menlo Park',
            postal_code: '94025',
            state: 'CA',
            country: 'US',
          },
          summary: {
            subtotal: 698.99,
            shipping_cost: 20.00,
            total_tax: 57.67,
            total_cost: 626.66,
          },
          adjustments: [{
            name: 'New Customer Discount',
            amount: -50,
          }, {
            name: '$100 Off Coupon',
            amount: -100,
          }],
        },
      },
    }];
  }
}

module.exports = SampleOutputs;
