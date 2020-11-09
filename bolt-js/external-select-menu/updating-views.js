module.exports = (app) => {
  // Example of responding to an external_select options request
  app.options('external_action', async ({ options, ack }) => {
    console.log('!!!! external action');
    // Get information specific to a team or channel
    const results = [
      { label: 'Item 10', value: 'item-10' },
      { label: 'Item 11', value: 'item-11' },
      { label: 'Item 12', value: 'item-12' }
    ];

    if (results) {
      let options = [];
      // Collect information in options array to send in Slack ack response
      for (const index in results) {
        console.log('result:', result);
        options.push({
          "text": {
            "type": "plain_text",
            "text": results[index].label
          },
          "value": results[index].value
        });
      }

      console.log('options:', options);
      await ack({
        "options": options
      });
    } else {
      await ack();
    }
  });




  // // Listen for a button invocation with action_id `button_abc` (assume it's inside of a modal)
  // app.action('text1234', async ({ ack, body, client }) => {
  //   // Acknowledge the button request
  //   await ack();
  //   console.log('ACTION FOR text1234')

  //   try {
  //     // Call views.update with the built-in client
  //     const result = await client.views.update({
  //       // Pass the view_id
  //       view_id: body.view.id,
  //       // Pass the current hash to avoid race conditions
  //       hash: body.view.hash,
  //       // View payload with updated blocks
  //       view: {
  //         type: 'modal',
  //         // View identifier
  //         callback_id: 'view_1',
  //         title: {
  //           type: 'plain_text',
  //           text: 'Modal title'
  //         },
  //         blocks: [
  //           {
  //             type: 'section',
  //             block_id: 'section678',
  //             text: {
  //               type: 'mrkdwn',
  //               text: 'Pick an item from the dropdown list'
  //             },
  //             accessory: {
  //               action_id: 'text1234',
  //               type: 'static_select',
  //               placeholder: {
  //                 type: 'plain_text',
  //                 text: 'Select an item'
  //               },
  //               options: [
  //                 {
  //                   text: {
  //                     type: 'plain_text',
  //                     text: '*this is plain_text text - value-0*'
  //                   },
  //                   value: 'value-0'
  //                 },
  //                 {
  //                   text: {
  //                     type: 'plain_text',
  //                     text: '*this is plain_text text - value-1*'
  //                   },
  //                   value: 'value-1'
  //                 },
  //                 {
  //                   text: {
  //                     type: 'plain_text',
  //                     text: '*this is plain_text text - value-2*'
  //                   },
  //                   value: 'value-2'
  //                 }
  //               ]
  //             }
  //           },
  //           {
  //             type: 'section',
  //             block_id: 'section679',
  //             text: {
  //               type: 'mrkdwn',
  //               text: 'This dropdown is updated from the first'
  //             },
  //             accessory: {
  //               action_id: 'text12345',
  //               type: 'static_select',
  //               placeholder: {
  //                 type: 'plain_text',
  //                 text: 'Select an item'
  //               },
  //               options: [
  //                 {
  //                   text: {
  //                     type: 'plain_text',
  //                     text: 'Item 6'
  //                   },
  //                   value: 'value-6'
  //                 },
  //                 {
  //                   text: {
  //                     type: 'plain_text',
  //                     text: 'Item 7'
  //                   },
  //                   value: 'value-7'
  //                 },
  //                 {
  //                   text: {
  //                     type: 'plain_text',
  //                     text: 'Item 8'
  //                   },
  //                   value: 'value-8'
  //                 }
  //               ]
  //             }
  //           }
  //         ],
  //         submit: {
  //           type: 'plain_text',
  //           text: 'Submit'
  //         }
  //       }
  //     });
  //     console.log(JSON.stringify(result, 0, 2));
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // });
};