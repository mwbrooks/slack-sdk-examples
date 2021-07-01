const { App, LogLevel, SocketModeReceiver } = require('@slack/bolt');

const { config } = require('dotenv');
config();

// const clientOptions = {
  // enable this for dev instance
  // slackApiUrl: 'https://dev.slack.com/api/'
// };

// const socketModeReceiver = new SocketModeReceiver({
//   appToken: process.env.APP_TOKEN,
//   installerOptions: {
//     clientOptions,
//     // use the following when running against a dev instance and using OAuth
//     // authorizationUrl: 'https://dev.slack.com/oauth/v2/authorize',
//   },

//   // enable the following if you want to use OAuth
//   // clientId: process.env.CLIENT_ID,
//   // clientSecret: process.env.CLIENT_SECRET,
//   // stateSecret: 'my-state-secret',
//   // scopes: ['channels:read', 'chat:write', 'app_mentions:read', 'channels:manage', 'commands'],

//   logLevel: LogLevel.DEBUG,
// });

console.log(`env: ${process.env.SLACK_BOT_TOKEN}\n${process.env.SLACK_APP_TOKEN}`)
const app = new App({
  // receiver: socketModeReceiver,
  token: process.env.SLACK_BOT_TOKEN, //disable this if enabling OAuth in socketModeReceiver
  // logLevel: LogLevel.DEBUG,
  // clientOptions,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app started');
})();

// Listen to slash command
app.command('/echo', async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();

  // Simple text response
  // await say(`You said ${command.text}`);

  // Display attachment colors
  await say({
    "text": "Outer text",
    "attachments": [
      {
          "color": "#88D8B0",
          "blocks": [
            {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": "Section block text is good"
              }
            }
          ]
      },
      {
          "color": "#D73A49",
          "blocks": [
            {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": "Section block text is bad"
              }
            }
          ]
      }
    ]
  })
});