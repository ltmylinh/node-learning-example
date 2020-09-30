import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Layout, Row } from 'antd';

import { USER } from '../../lib/graphql/queries';
import {
  User as UserData,
  UserVariables,
} from '../../lib/graphql/queries/User/__generated__/User';

import { UserProfile, UserBookings, UserListings } from './components';
import { Viewer } from '../../lib/types';

import { ErrorBanner, PageSkeleton } from '../../lib/components';

interface MatchParams {
  id: string;
}

interface Props {
  viewer: Viewer;
}

const { Content } = Layout;

const PAGE_LIMIT = 4;

export const User = ({
  match,
  viewer,
}: Props & RouteComponentProps<MatchParams>) => {
  const [bookingsPage, setBookingsPage] = useState<number>(1);
  const [listingsPage, setListingsPage] = useState<number>(1);

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
      bookingsPage,
      listingsPage,
      limit: PAGE_LIMIT,
    },
  });

  if (loading) {
    return (
      <Content className='user'>
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className='user'>
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data?.user || null;
  const viewerIsUser = viewer.id === match.params.id;
  const userProfileElm = user ? (
    <UserProfile user={user} viewerIsUser={viewerIsUser} />
  ) : null;

  const userBookings = user?.bookings || null;
  const userListings = user?.listings || null;

  return (
    <Content className='user'>
      <Row gutter={12} justify='space-between'>
        <Col xs={24}>{userProfileElm}</Col>
        <Col xs={24}>
          <UserBookings
            userBookings={userBookings}
            bookingsPage={bookingsPage}
            setBookingsPage={setBookingsPage}
            limit={PAGE_LIMIT}
          />
        </Col>
        <Col xs={24}>
          {userListings && (
            <UserListings
              userListings={userListings}
              listingsPage={listingsPage}
              setListingsPage={setListingsPage}
              limit={PAGE_LIMIT}
            />
          )}
        </Col>
      </Row>
    </Content>
  );
};
