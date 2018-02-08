const cassandra = require('cassandra-driver');
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
  const query = 'SELECT reserve_date FROM booked WHERE listing_id = ?';
  return new Promise((resolve, reject) => {
    client.execute(query, params, {prepare: true})
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

const createBooking = (params) => {
  const query = 'INSERT INTO bookings (listing_id, reserve_date, book_time, book_user_id, host_id, id) VALUES (?, ?, ?, ?, ?, ?)';
  client.execute(query, params, {prepare: true})
    .then(result => console.log('Success', result))
    .catch(err => console.error('Error', err));
};

module.exports = { 
  listingBookDates,
  createBooking
};