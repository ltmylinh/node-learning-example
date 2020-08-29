import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database';

const port = 9000;
const startApp = async (app: Application) => {
  const db = await connectDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  server.applyMiddleware({ app, path: '/api' });
  app.listen(port);

  //test connection db
  const listings = await db.listings.find({}).toArray();
  console.log(listings);

  console.log(`[app] is listening on port ${port}`);
};

startApp(express());
