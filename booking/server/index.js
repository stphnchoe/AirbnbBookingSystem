const newrelic = require('newrelic');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const AWS = require('aws-sdk');
const cassDB = require('../database/index.js');
const moment = require ('moment');
const uuid = require('uuid');

AWS.config.update({
  region: 'us-west-1'
})
var sqs = new AWS.SQS();

const app = new Koa();
const router = new Router();
const port = 3000;

app.listen(port);
console.log('connected to server');

app.use(bodyParser());

//testing eeddef61-0878-11e8-9d64-f7887e6779f1
router
  .get('/', (ctx) => ctx.body = 'Hello World')
  .get('/booking/:listingid', async (ctx) => {
    const params = ctx.params.listingid;
    var bookedDates = await cassDB.listingBookDates([params]);
    ctx.response.status = 200;
    ctx.body = bookedDates.rows;
  })
  .post('/booking', async (ctx) => {
    const body = ctx.request.body;
    const book_time = moment(body.book_time).format()
    const bookingInfo = [body.listing_id, body.reserve_date, book_time, body.book_user_id, body.host_id, uuid.v1()];
    cassDB.createBooking(bookingInfo);
    ctx.response.status = 201;

    const inventoryMessage = {
      MessageBody: JSON.stringify({
        listing_id: ctx.request.body.listing_id,
        book_time: book_time
      }),
      QueueUrl: "https://sqs.us-west-1.amazonaws.com/462015734403/fromBookings",
    }
    // const eventMessage = {
    //   MessageBody: JSON.stringify({
    //     listing_id: ctx.request.body.listing_id,
    //     book_time: moment().format(),
    //     book_user_id: ctx.request.body.book_user_id
    //   }),
    //   QueueUrl: "event queue url",
    // }

    sqs.sendMessage(inventoryMessage, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
    // sqs.sendMessage(eventMessage, function(err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(data);
    //   }
    // });
    ctx.body = 'Booking completed successfully!';
  });

app.use(router.routes());