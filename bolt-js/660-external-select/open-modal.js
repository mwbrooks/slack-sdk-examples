module.exports = (app) => {
  // Listen for a slash command invocation
  app.command('/ticket', async ({ ack, body, client }) => {
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
          // View identifier
          callback_id: 'view_1',
          title: {
            type: 'plain_text',
            text: 'Modal title'
          },
          blocks: [
            {
              type: 'section',
              block_id: 'section-block',
              text: {
                type: 'mrkdwn',
                text: 'Pick an item from the dropdown list'
              },
              accessory: {
                action_id: 'static-select-action',
                type: 'static_select',
                placeholder: {
                  type: 'plain_text',
                  text: 'Select an item'
                },
                options: [
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text - value-0*'
                    },
                    value: 'value-0'
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text - value-1*'
                    },
                    value: 'value-1'
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text - value-2*'
                    },
                    value: 'value-2'
                  }
                ]
              }
            },
            {
              type: 'section',
              block_id: 'section-block-2',
              text: {
                type: 'mrkdwn',
                text: 'Pick an item from the dropdown list'
              },
              accessory: {
                action_id: 'static-select-action-2',
                type: 'static_select',
                placeholder: {
                  type: 'plain_text',
                  text: 'Select an item'
                },
                options: [
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text - value-0*'
                    },
                    value: 'value-0'
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text - value-1*'
                    },
                    value: 'value-1'
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text - value-2*'
                    },
                    value: 'value-2'
                  }
                ]
              }
            },
            {
              "type": "input",
              "block_id": "division",
              "label": {
                "type": "plain_text",
                "text": "Division",
                "emoji": true
              },
              "element": {
                "type": "external_select",
                "action_id": "division",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select",
                  "emoji": true
                }
              }
            },
            {
              "type": "input",
              "block_id": "department",
              "label": {
                "type": "plain_text",
                "text": "Department",
                "emoji": true
              },
              "element": {
                "type": "external_select",
                "action_id": "department",
                "placeholder": {
                  "type": "plain_text",
                  "text": "Select",
                  "emoji": true
                }
              }
            }
          ],
          submit: {
            type: 'plain_text',
            text: 'Submit'
          }
        }
      });
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  });
};