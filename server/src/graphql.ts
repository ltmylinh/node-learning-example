import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import { listing } from './listing';

const Listing = new GraphQLObjectType({
  name: 'Listing',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    image: { type: GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt) },
    numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
    numOfBeds: { type: GraphQLNonNull(GraphQLInt) },
    numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
    rating: { type: GraphQLNonNull(GraphQLInt) },
  },
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    listing: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
      resolve: () => listing,
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteListing: {
      type: GraphQLNonNull(Listing),
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, { id }) => {
        for (let i = 0; i < listing.length; i++) {
          if (listing[i].id === id) {
            return listing.slice(i, 1)[0];
          }
        }
        throw new Error('failing to delete listing');
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query,
  mutation,
});
