
CREATE KEYSPACE IF NOT EXISTS airbnb
    with REPLICATION = {
        'class' : 'SimpleStrategy', 'replication_factor' : 1
    };

USE airbnb;

CREATE TABLE IF NOT EXISTS bookings (
    listing_id uuid,
    reserve_date timestamp,
    book_time timestamp,
    book_user_id uuid,
    host_id uuid,
    id uuid,
    PRIMARY KEY(listing_id, reserve_date)
)
WITH CLUSTERING ORDER BY (reserve_date DESC);