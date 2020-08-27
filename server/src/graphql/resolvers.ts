import { IResolvers } from 'apollo-server-express';
import { listing } from '../listing';

export const resolvers: IResolvers = {
  Query: {
    listings: () => {
      return listing;
    },
  },
  Mutation: {
    deleteListing: (root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < listing.length; i++) {
        if (listing[i].id === id) {
          return listing.slice(i, 1)[0];
        }
      }
      throw new Error('failing to delete listing');
    },
  },
};
