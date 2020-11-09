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
              block_id: 'section678',
              text: {
                type: 'mrkdwn',
                text: 'Pick an item from the dropdown list'
              },
              accessory: {
                action_id: 'text1234',
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
              block_id: 'section679',
              text: {
                type: 'mrkdwn',
                text: 'This dropdown is updated from the first'
              },
              accessory: {
                action_id: 'text12345',
                type: 'static_select',
                placeholder: {
                  type: 'plain_text',
                  text: 'Select an item'
                },
                options: [
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text - value-3*'
                    },
                    value: 'value-3'
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text - value-4*'
                    },
                    value: 'value-4'
                  },
                  {
                    text: {
                      type: 'plain_text',
                      text: '*this is plain_text text - value-5*'
                    },
                    value: 'value-5'
                  }
                ]
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