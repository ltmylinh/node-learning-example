import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';

import { LISTING } from '../../lib/graphql/queries';
import {
  Listing as ListingData,
  ListingVariables,
} from '../../lib/graphql/queries/Listing/__generated__/Listing';

import { PageSkeleton, ErrorBanner } from '../../lib/components';

interface MatchParams {
  id: string;
}

const LIMIT = 3;

const { Content } = Layout;
export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [bookingPage, setBookingPage] = useState(1);

  const { data, loading, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    { variables: { id: match.params.id, bookingPage, limit: LIMIT } }
  );

  if (loading) {
    return (
      <Content className='listings'>
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className='listing'>
        <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const listing = data ? data.listing : null;
  const listingBookings = listing ? listing.bookings : null;

  return <h2>Listing</h2>;
};
