/*jslint esversion: 6, node : true */
"use strict";

const { RTMClient } = require('@slack/rtm-api');
const rtm = new RTMClient(process.env.SLACK_CLASSIC_BOT_TOKEN);


// Message event
// https://api.slack.com/events/message
rtm.on( 'message', async (event) => {

    //logger.info( "%j", event );

    // Ignore subtype messages
    if ( event.subtype !== undefined )
        return;

    try
    {
        // this doesn't work
        await rtm.sendMessage( "hello!", event.channel );
    }
    catch ( err )
    {
        console.log( err );
    }
});

async function start()
{
  // Connect to Slack
  const { self, team } = await rtm.start();
}

start();