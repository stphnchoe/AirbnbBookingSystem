const cassandra = require('cassandra-driver');
const assert = require('assert');
const uuid = require('uuid');
const client = new cassandra.Client({ contactPoints: ["localhost"], keyspace: 'airbnb' });

client.connect(err => {
  if (err) {
    return console.error(err);
  }
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
});

// client.execute(`CREATE TABLE IF NOT EXISTS bookingIN (id uuid PRIMARY KEY, book_time timestamp)`, (err) => {
//     assert.ifError(err);
//     console.log('failure');
//   });

const listingBookDates = (params) => {
  const query = 'SELECT * FROM bookings WHERE listing_id = ? and reserve_date > toTimestamp(now())';
  client.execute(query, [params], {prepare: true})
    .then(result => console.log(result.rows.map( row => row.reserve_date)))
    .catch(err => console.error(err));
};

const createBooking = (params) => {
  const query = `INSERT INTO bookings (listing_id, reserve_date, book_time, book_user_id, host_id, id) VALUES = (?, ?, ?, ?, ?, ${uuid.v4()})`;
  client.execute(query, params, {prepare: true})
    .then(result => console.log(result.rows))
    .catch(err => console.error(err));
};

module.exports = { 
  listingBookDates,
  createBooking
};