const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ["localhost"], keyspace: 'airbnb' });

client.connect(err => {
  if (err) {
    return console.error(err);
  }
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
});

const listingBookDates = (params) => {
  const query = 'SELECT reserve_date FROM bookings WHERE listing_id = ?';
  return new Promise((resolve, reject) => {
    client.execute(query, params, {prepare: true})
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

const createBooking = (params) => {
  const query = 'INSERT INTO bookings (listing_id, reserve_date, book_time, book_user_id, host_id, id) VALUES (?, ?, ?, ?, ?, ?) IF NOT EXISTS';
  return new Promise((resolve, reject) => {
    client.execute(query, params, {prepare: true})
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
};

module.exports = { 
  listingBookDates,
  createBooking
};