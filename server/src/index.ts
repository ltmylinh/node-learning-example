// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database';

const startApp = async (app: Application) => {
  const db = await connectDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  server.applyMiddleware({ app, path: '/api' });
  app.listen(process.env.PORT);

  console.log(`[app] is listening on port ${process.env.PORT}`);
};

startApp(express());
