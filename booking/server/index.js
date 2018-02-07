const newrelic = require('newrelic');
const Koa = require('koa');
const koaNewrelic = require('koa-newrelic')(newrelic);
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cassDB = require('../database/index.js');
const uuid = require('uuid');

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
    const params = [ctx.request.body.listing_id, ctx.request.body.reserve_date, ctx.request.body.book_time, ctx.request.body.book_user_id, ctx.request.body.host_id, uuid.v4()];
    cassDB.createBooking(params);
    ctx.response.status = 201;
    ctx.body = 'Booking completed successfully!';
  });

app.use(koaNewrelic);
app.use(router.routes());