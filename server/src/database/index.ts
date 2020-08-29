import { MongoClient } from 'mongodb';

const username = 'user_001';
const password = 'Testing20';
const cluster = 'cluster0';

const url = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net`;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('main');

  return {
    listings: db.collection('test_listing'),
  };
};
