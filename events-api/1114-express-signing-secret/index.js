const express = require('express');
const bodyParser = require('body-parser');
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

const PORT = process.env.PORT || 4390;
const app = express();

const slackEvents = createEventAdapter(slackSigningSecret);
app.use('/slack/events', slackEvents.requestListener());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

slackEvents.on('app_mention', async (event) => {
	try {
		console.log("I got a mention in this channel", event.channel);
	} catch (e) {
	}
});

// Starts server
app.listen(PORT, function() {
	console.log('Bot is listening on port ' + PORT);
});