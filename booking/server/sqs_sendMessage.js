const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-west-1'
});

const sqs = new AWS.SQS();

const sendMessage = (queueUrl, listing_id, book_time, id) => {
        
  const inventoryMessage = {
    MessageBody: 'inventory message',
    MessageAttributes: {
      listing_id: {
        DataType: 'String',
        StringValue: listing_id
      },
      book_time: {
        DataType: 'String',
        StringValue: book_time
      },
      id: {
        DataType: 'String',
        StringValue: id
      }
    },
    QueueUrl: queueUrl,
  };

  sqs.sendMessage(inventoryMessage, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

};

module.exports = {
  sendMessage
};