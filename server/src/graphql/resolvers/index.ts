import merge from 'lodash.merge';

import { userResolvers } from './User';
import { viewerResolvers } from './Viewer';
import { bookingResolvers } from './Booking';
import { listingResolvers } from './Listing';

export const resolvers = merge(
  userResolvers,
  viewerResolvers,
  bookingResolvers,
  listingResolvers
);
