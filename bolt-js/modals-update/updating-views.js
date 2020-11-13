module.exports = (app) => {
  // Listen for a button invocation with action_id `button_abc` (assume it's inside of a modal)
  app.action('button_abc', async ({ ack, body, client }) => {
    // Acknowledge the button request
    await ack();

    try {
      // Call views.update with the built-in client
      const result = await client.views.update({
        // Pass the view_id
        view_id: body.view.id,
        // Pass the current hash to avoid race conditions
        hash: body.view.hash,
        // View payload with updated blocks
        view: {
          type: 'modal',
          // View identifier
          callback_id: 'view_1',
          title: {
            type: 'plain_text',
            text: 'Updated modal'
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'plain_text',
                text: 'You updated the modal!'
              }
            },
            {
              type: 'image',
              image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
              alt_text: 'Yay! The modal was updated'
            }
          ]
        }
      });
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  });
};