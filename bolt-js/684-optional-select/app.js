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
app.command('/slash-command', async ({ ack, body, client }) => {
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
        callback_id: 'view_callback_id_1',
        title: {
          type: 'plain_text',
          text: 'Modal title'
        },
        blocks: [
          {
            type: 'input',
            block_id: 'block_id_1',
            optional: true,
            element: {
              action_id: 'country_a_h_action',
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select a country'
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Afghanistan'
                  },
                  value: 'afghanistan'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Albania'
                  },
                  value: 'albania'
                }
              ]
            },
            label: {
              type: 'plain_text',
              text: 'Country A-H'
            }
          },
          {
            type: 'input',
            block_id: 'block_id_2',
            optional: true,
            element: {
              action_id: 'country_i_r_action',
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select a country'
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Iceland'
                  },
                  value: 'iceland'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'India'
                  },
                  value: 'india'
                }
              ]
            },
            label: {
              type: 'plain_text',
              text: 'Country I-R'
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

// On selection
app.action('country_a_h_action', async ({ ack, body, client }) => {
  await ack();
});

// On selection
app.action('country_i_r_action', async ({ ack, body, client }) => {
  await ack();
});

// On view submission
app.view('view_callback_id_1', async ({ ack, body, view, client }) => {
  // Default ack is a success
  let ackResponse = {};

  // Templated error response
  const ackErrorResponse = {
    'response_action': 'errors',
    'errors': {
      'block_id_1': 'Please select a country from A-Z',
      'block_id_2': 'Please select a country from A-Z'
    }
  };

  // Check if an option is selected
  try {
    const selectedOption = view.state.values.block_id_1.country_a_h_action.selected_option ||
                            view.state.values.block_id_2.country_i_r_action.selected_option;
    if (!selectedOption) {
      ackResponse = ackErrorResponse;
    }
  }
  catch(e) {
    console.error(e);
    ackResponse = ackErrorResponse;
  }

  await ack(ackResponse);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();