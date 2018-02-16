const AWS = require('aws-sdk');
const awsConfig = require('../etc/config.js');
AWS.config.update({
  accessKeyId: awsConfig.aws_access_key_id,
  secretAccessKey: awsConfig.aws_secret_access_key,
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