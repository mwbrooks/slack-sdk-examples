import logging
import json
import os
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from slack_sdk.errors import SlackApiError


logging.basicConfig(level=logging.INFO)

# Initializes your app with your bot token and signing secret
app = App(
    token=os.environ.get("SLACK_BOT_TOKEN")
)

@app.command("/slash-command")
def slash_command(ack, client, say, command, body, logger):
    # Acknowledge the shortcut request
    ack()

    try:
        # Call the views_open method using the built-in WebClient
        api_response = client.views_open(
            trigger_id=body["trigger_id"],
            # A simple view payload for a modal
            view={
                "title": {
                    "type": "plain_text",
                    "text": "File a bug",
                    "emoji": True
                },
                "submit": {
                    "type": "plain_text",
                    "text": "Submit",
                    "emoji": True
                },
                "type": "modal",
                "close": {
                    "type": "plain_text",
                    "text": "Cancel",
                    "emoji": True
                },
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "plain_text",
                            "text": "This form will submit your bug to the #dev-bugs board on monday.com",
                            "emoji": True
                        }
                    }
                ]
            }
        )
        logger.info(api_response)
    except SlackApiError as e:
        logger.error("Error creating conversation: {}".format(e))

# Start your app
if __name__ == "__main__":
    # export SLACK_APP_TOKEN=xapp-***
    # export SLACK_BOT_TOKEN=xoxb-***
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()
