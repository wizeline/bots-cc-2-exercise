module.exports = {
  intro: {
    text: [
      'Hello! I\'m the Foursquare chatbot!',
      'I\'m here to help you find the best restaurants in the city',
      'Do you want to give it a try?',
    ],
    button: [
      {
        title: 'Let\'s do this!',
        payload: 'Go',
        type: 'postback',
      },
    ],
  },
  location: {
    text: [
      'Ok, please tell me the name of your city or zip code to start',
    ],
  },
  recommended: {
    text: [
      'Got it, I can help you find a restaurant based on your preferences',
    ],
    button: [
      {
        title: 'Find me a Restraurant',
        payload: 'Go',
        type: 'postback',
      },
    ],
  },
  top5:
  {

  },
  cuisine: {
    text: [
      'So, what do you feel like eating?',
    ],
    button: [
      {
        title: 'Chinese',
        payload: 'Chinese',
        type: 'postback',
      },
      {
        title: 'Italian',
        payload: 'Italian',
        type: 'postback',
      },
      {
        title: 'Japanese',
        payload: 'Japanese',
        type: 'postback',
      },
      {
        title: 'Greek',
        payload: 'Greek',
        type: 'postback',
      },
      {
        title: 'French',
        payload: 'French',
        type: 'postback',
      },
      {
        title: 'Mexican',
        payload: 'Mexican',
        type: 'postback',
      },
      {
        title: 'Other',
        payload: 'Other',
        type: 'postback',
      },
    ],
  },
  customCuisine: {
    text: [
      'Ok, enter the name of the cuisine you\'re interested in',
    ],
  },
  price: {

  },
  formatResult: (restaurants) => {
    console.log(JSON.stringify(restaurants, null, 2));
    const baseUrl = 'foursquare.com/v/';
    const venues = restaurants.response.venues;
    const text = [];
    const matchCount = venues.length;
    let limit = 5;
    if (matchCount < 10) {
      limit = matchCount;
    }

    // Add information about the results
    if (matchCount > 0) {
      text.push(`Perfect! I found ${matchCount} restaurants around you`);
      text.push('These are some of them');
    } else {
      text.push(`Sorry, I did not found any results`);
    }
    let id;
    let name;
    for (let venueCounter = 0; venueCounter < limit; venueCounter += 1) {
      id = venues[venueCounter].id;
      name = venues[venueCounter].name;

      text.push(name);
      text.push(`${baseUrl}${id}`);
    }
    return ({ text });
  },
};
