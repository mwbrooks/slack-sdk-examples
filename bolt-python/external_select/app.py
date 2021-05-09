import json
import os
import re
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

# Initializes your app with your bot token and signing secret
app = App(
    token=os.environ.get("SLACK_BOT_TOKEN")
)


@app.command("/slash-command")
def slash_command(ack, client, say, command, body):
    # Acknowledge command request
    ack()
    # say(f"{command['text']}")
    # Call views_open with the built-in client
    client.views_open(
        # Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id=body["trigger_id"],
        # View payload
        view={
            "type": "modal",
            # View identifier
            "callback_id": "view_1",
            "title": {"type": "plain_text", "text": "My App"},
            "submit": {"type": "plain_text", "text": "Submit"},
            "blocks": [
                {
                    "type": "section",
                    "block_id": "section_1",
                    "text": {
                      "type": "mrkdwn",
                      "text": "Please choose a country"
                    },
                    "accessory": {
                      "action_id": "external_action",
                      "type": "external_select",
                      "placeholder": {
                        "type": "plain_text",
                        "text": "Select a country"
                      },
                      "min_query_length": 2 # Search after 2 characters (default: 3)
                    }
                }
            ]
        }
    )


# Example of responding to an external_select options request
@app.options("external_action")
def show_options(ack, body):
    with open("countries.json") as f:
      data = json.load(f)

    options = list()
    for d in data:
        if (re.match(body["value"], d["country"], re.I)):
            options.append({
                "text": { "type": "plain_text", "text": d["country"] },
                "value": d["country"]
            })

    ack(options=options)


@app.view("view_1")
def handle_view_events(ack, body, logger):
    ack()
    logger.info(body)


# Start your app
if __name__ == "__main__":
    # export SLACK_APP_TOKEN=xapp-***
    # export SLACK_BOT_TOKEN=xoxb-***
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()
