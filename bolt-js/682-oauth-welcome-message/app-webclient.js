const { App } = require('@slack/bolt');
const { WebClient } = require('@slack/web-api');

// Initializes your app with your bot token and signing secret
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  scopes: ['chat:write'],
  installerOptions: {
    callbackOptions: {
      success: (installation, installOptions, req, res) => {
        // Display a success page or redirect back into Slack
        //
        // Learn how to redirect into Slack:
        // https://github.com/slackapi/node-slack-sdk/blob/main/packages/oauth/src/index.ts#L527-L552
        res.send('successful');

        // Send a welcome message to the user as a DM
        const client = new WebClient(installation.bot.token);
        client.chat.postMessage({
          token: installation.bot.token,
          channel: installation.user.id,
          text: ':wave: Welcome!'
        });
      }
    }
  }
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();