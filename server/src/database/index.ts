import { MongoClient } from 'mongodb';

const username = 'user_001';
const password = 'YNrhh7om6XbLMxLe';
const cluster = 'cluster0';
const dbName = 'main';

const url = `mongodb+srv://${username}:${password}@cluster0.4lnm2.mongodb.net/${dbName}?retryWrites=true&w=majority`;

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
