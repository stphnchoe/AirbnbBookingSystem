const newrelic = require('newrelic');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaNewrelic = require('koa-newrelic')(newrelic);
const moment = require ('moment');
const uuid = require('uuid');
const cassDB = require('../database/index.js');
const sqs = require('./sqs_sendMessage.js');

const app = new Koa();
const router = new Router();
const port = 3000;

app.listen(port);
console.log('connected to server');

app.use(bodyParser());

//testing eeddef61-0878-11e8-9d64-f7887e6779f1
router
  .get('/booking/:listingid', async (ctx) => {
    try {
      const params = ctx.params.listingid;
      var bookedDates = await cassDB.listingBookDates([params]);
      ctx.status = 200;
      ctx.body = bookedDates.rows;
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  })
  .post('/booking', async (ctx) => {
    try {
      const body = ctx.request.body;
      const book_time = moment(Number(body.book_time)).format()
      const id = uuid.v1();
      const reserve_date = body.reserve_date;
      if (reserve_date < moment(Date.now()).format()) {
        throw new Error('Error: Cannot book a past date');
      } else {
        const bookingInfo = [body.listing_id, reserve_date, book_time, body.book_user_id, body.host_id, id];
        var booked = await cassDB.createBooking(bookingInfo);
        if (booked.rows[0]["[applied]"]) {
        ctx.status = 201;
        // sqs.sendMessage("https://sqs.us-west-1.amazonaws.com/462015734403/fromBookings", ctx.request.body.listing_id, book_time, id);
        // sqs.sendMessage("https://sqs.us-west-1.amazonaws.com/608151570921/bookingQ", ctx.request.body.listing_id,  book_time, host_id);
        ctx.body = booked;
      } else {
        ctx.status = 200;
        ctx.body = 'The date has already been booked';
      }
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});
app.use(koaNewrelic);
app.use(router.routes());

module.exports = {
  app
}