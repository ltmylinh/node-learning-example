import React from 'react';

import { User as UserData } from '../../../lib/graphql/queries/User/__generated__/User';

interface Props {
  user: UserData['user'];
}

export const UserProfile = ({ user }: Props) => {
  return <h1>User</h1>;
};
