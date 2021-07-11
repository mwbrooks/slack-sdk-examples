import logging
import json
import os
import re
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from slack_sdk.errors import SlackApiError

logging.basicConfig(level=logging.INFO)

# Initializes your app with your bot token and signing secret
app = App(
    token=os.environ.get("SLACK_BOT_TOKEN")
)


@app.command("/slash-command")
def repeat_text(ack, body, client, say, command, logger):
    # Acknowledge command request
    ack()

    # say({
    client.views_open(
        trigger_id=command["trigger_id"],
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
            "callback_id": "view_1_callback_id",
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": True
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "I noticed you mentioned a failed scan ... Please select which control is failing the Scan:\n\n"
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "checkboxes",
                        "action_id": "action1",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Vulnerability Severity",
                                    "emoji": True
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Sensitive Data",
                                    "emoji": True
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Malware",
                                    "emoji": True
                                },
                                "value": "value-2"
                            }
                        ]
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Please select all relevant options:",
                        "emoji": True
                    }
                }
            ]
        }
    )


@app.action("action1")
def approve_request(ack, body, say, client, respond):
    # Acknowledge action request
    ack()
    client.chat_postMessage(channel=body["channel"]["id"], thread_ts=body["message"]["ts"], text="Request approved 👍")


@app.view("view_1_callback_id")
def handle_view_events(ack, body, logger):
    ack()
    logger.info(body)


# Start your app
if __name__ == "__main__":
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()
