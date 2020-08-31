import { MongoClient } from 'mongodb';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.4lnm2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = await client.db('main');

    const listings = db.collection('test_listing');
    return {
      listings,
    };
  } catch (error) {
    console.log(error);
  }
};
