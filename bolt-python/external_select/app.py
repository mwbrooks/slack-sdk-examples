import logging
import json
import os
import re
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

logging.basicConfig(level=logging.INFO)

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
                },
                {
                    "type": "section",
                    "block_id": "section_2",
                    "text": {
                      "type": "mrkdwn",
                      "text": "Please another country"
                    },
                    "accessory": {
                      "action_id": "external_action_2",
                      "type": "external_select",
                      "placeholder": {
                        "type": "plain_text",
                        "text": "Select another country"
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
                "value": d["abbreviation"]
            })

    ack(options=options)


@app.action("external_action")
def handle_some_action(ack, body, logger):
    ack()
    logger.info(body)
    logger.info(body["view"]["state"]["values"]["section_1"])


# Example of responding to an external_select options request
@app.options("external_action_2")
def show_options(ack, body, logger):
    logger.info("EXTERNAL_ACTION_2 - options")
    logger.info(body["view"])
    logger.info("---")

    with open("countries.json") as f:
      data = json.load(f)

    options = list()
    for d in data:
        if (re.match(body["value"], d["country"], re.I)):
            options.append({
                "text": { "type": "plain_text", "text": d["country"] },
                "value": d["abbreviation"]
            })

    ack(options=options)


@app.action("external_action_2")
def handle_some_action(ack, body, logger):
    ack()
    logger.info("EXTERNAL_ACTION_2 - action")
    # logger.info(body)
    logger.info(body["view"]["state"]["values"])
    logger.info("---")


@app.view("view_1")
def handle_view_events(ack, body, logger):
    ack()
    # logger.info(body)

# Start your app
if __name__ == "__main__":
    # export SLACK_APP_TOKEN=xapp-***
    # export SLACK_BOT_TOKEN=xoxb-***
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()
