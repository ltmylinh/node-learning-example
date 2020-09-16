import { MongoClient } from 'mongodb';

import { User, Listing, Booking } from '../lib/types';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.4lnm2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const db = await client.db('main');

    return {
      bookings: db.collection<Booking>('bookings'),
      listings: db.collection<Listing>('listings'),
      users: db.collection<User>('users'),
    };
  } catch (error) {
    console.log(error);
  }
};
