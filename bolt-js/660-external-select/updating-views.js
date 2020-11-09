module.exports = (app) => {
  app.action('static-select-action', async ({ ack, body, client }) => {
    // Acknowledge the button request
    await ack();
    console.log('ACTION FOR static-selection-action')
    console.log('body:', body);
    console.log('body.view.state.values:', body.view.state.values);
    console.log('body.view.state.values:', JSON.stringify(body.view.state.values, 0, 2));
  });

  app.action('static-select-action-2', async ({ ack, body, client }) => {
    // Acknowledge the button request
    await ack();
    console.log('ACTION FOR static-select-action-2')
    console.log('body:', body);
    console.log('body.view.state.values:', body.view.state.values);
  });

  app.options('division', async ({ options, ack, body, client }) => {
    console.log('!!!! external action');
    console.log('body:', body);
    console.log('body.view.state.values:', body.view.state.values);
    console.log('body.view.blocks:', JSON.stringify(body.view.blocks));
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
  // department
  app.options('department', async ({ options, ack, body, client }) => {
    console.log('!!!! department');
    console.log('body:', body);
    console.log('body.view.state.values:', body.view.state.values);
    console.log('body.view.blocks:', JSON.stringify(body.view.blocks));
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
};