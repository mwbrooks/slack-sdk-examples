const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event('reaction_added', async ({ event, client }) => {
  try {
    // Call the conversations.history method using the built-in WebClient
    const result = await client.conversations.history({
      channel: event.item.channel,
      latest: event.item.ts,
      inclusive: true, // Limit the results to only one
      limit: 1
    });

    // There should only be one result (stored in the zeroth index)
    const message = result.messages[0];

    console.log('message:', message);
  }
  catch(e) {
    console.log('error:', e);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();