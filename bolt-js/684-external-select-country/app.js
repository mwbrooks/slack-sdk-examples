const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Load all countries
// This exceeds the 100 element limit of a Block Kit select box
const results = require('./countries').map((country) => {
  return {
    name: country.country,
    value: country.abbreviation
  };
});

// Listen for a slash command invocation
app.command('/slash-command', async ({ ack,body, client }) => {
  // Acknowledge the command request
  await ack();

  try {
    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: 'modal',
        callback_id: 'view_1', // view identifier
        title: {
          type: 'plain_text',
          text: 'Modal title'
        },
        blocks: [
          {
            type: 'section',
            block_id: 'section_1',
            text: {
              type: 'mrkdwn',
              text: 'Please choose a country'
            },
            accessory: {
              action_id: 'external_action',
              type: 'external_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select a country'
              },
              min_query_length: 2 // Search after 2 characters (default: 3)
            }
          }
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit'
        }
      }
    });
  }
  catch (error) {
    console.error(error);
  }
});

// Example of responding to an external_select options request
app.options('external_action', async ({ options, ack }) => {
  // Filter the countries based on the user's typed value
  const matchValue = options.value.toLowerCase();
  let matchedCountries = results.filter((country) => {
    return country.name.toLowerCase().match(matchValue);
  });

  // Truncate the matched list to 100 elements to respect Block Kit's limitation
  if (matchedCountries.length > 100) {
    matchedCountries = matchedCountries.slice(0, 100);
  }

  if (matchedCountries) {
    const ackOptions = [];
    // Collect the countries into an options array to send in Slack ack response
    matchedCountries.forEach((country) => {
      ackOptions.push({
        'text': {
          'type': 'plain_text',
          'text': country.name
        },
        'value': country.value
      });
    });
    await ack({
      'options': ackOptions
    });
  } else {
    await ack();
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();