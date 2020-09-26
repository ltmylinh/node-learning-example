import { Request } from 'express';
import { IResolvers } from 'apollo-server-express';

import {
  UserArgs,
  UserBookingArgs,
  UserBookingData,
  UserListingArgs,
  UserListingData,
} from './types';
import { Database, User } from '../../../lib/types';
import { authorize } from '../../../lib/utils';

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User | null> => {
      try {
        const user = await db.users.findOne({ _id: id });

        if (!user) {
          throw new Error("user can't be found");
        }

        const viewer = await authorize(db, req);
        if (viewer?._id === user._id) {
          user.authorized = true;
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
  },
  User: {
    id: (user: User): string | undefined => {
      return user._id;
    },
    hasWallet: (user: User): boolean => {
      return Boolean(user.walletId);
    },
    income: (user: User): number | null => {
      return user.authorized ? user.income : null;
    },
    bookings: async (
      user: User,
      { limit, page }: UserBookingArgs,
      { db }: { db: Database }
    ): Promise<UserBookingData | null> => {
      try {
        if (!user.authorized) {
          return null;
        }

        const data: UserBookingData = {
          total: 0,
          result: [],
        };

        const cursor = await db.bookings.find({ _id: { $in: user.bookings } });
        cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user bookings: ${error}`);
      }
    },
    listings: async (
      user: User,
      { limit, page }: UserListingArgs,
      { db }: { db: Database }
    ): Promise<UserListingData | null> => {
      try {
        const data: UserListingData = {
          total: 0,
          result: [],
        };

        const cursor = await db.listings.find({ _id: { $in: user.listings } });
        cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`);
      }
    },
  },
};
