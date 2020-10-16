import React, { useState, useRef, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Layout, List, Typography, Affix } from 'antd';
import { ListingCard, ErrorBanner } from '../../lib/components';
import { LISTINGS } from '../../lib/graphql/queries';
import {
  Listings as ListingsData,
  ListingsVariables,
} from '../../lib/graphql/queries/Listings/__generated__/Listings';
import { ListingFilter } from '../../lib/graphql/globalTypes';
import {
  ListingsFilter,
  ListingsPagination,
  ListingsSkeleton,
} from './components';

interface MatchParams {
  location: string;
}

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

const PAGE_LIMIT = 4;

export const Listings = ({ match }: RouteComponentProps<MatchParams>) => {
  const [filter, setFilter] = useState(ListingFilter.PRICE_LOW_TO_HIGH);
  const [page, setPage] = useState(1);
  const locationRef = useRef(match.params.location);

  const { data, loading, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      skip: locationRef.current !== match.params.location && page !== 1,
      variables: {
        location: match.params.location,
        filter,
        limit: PAGE_LIMIT,
        page,
      },
    }
  );

  useEffect(() => {
    setPage(1);
    locationRef.current = match.params.location;
  }, [match.params.location]);

  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;
  const listingsTotal = listings ? listings.total : 0;

  if (loading) {
    return (
      <Content className='listings'>
        <ListingsSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className='listings'>
        <ErrorBanner
          description={`
            We either couldn't find anything matching your search or have encountered an error.
            If you're searching for a unique location, try searching again with more common keywords.
          `}
        />
        <ListingsSkeleton />
      </Content>
    );
  }

  const listingsSectionElement =
    listings && listings.result.length ? (
      <>
        <Affix offsetTop={64}>
          <ListingsPagination
            total={listingsTotal}
            limit={PAGE_LIMIT}
            page={page}
            setPage={setPage}
          />
          <ListingsFilter {...{ filter, setFilter }} />
        </Affix>
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={listings.result}
          renderItem={(listing) => {
            return (
              <List.Item>
                <ListingCard listing={listing} />
              </List.Item>
            );
          }}
        />
      </>
    ) : (
      <div>
        <Paragraph>
          It appears that no listings have yet been created for{' '}
          <Text mark>"{listingsRegion}"</Text>
        </Paragraph>
        <Paragraph>
          Be the first person to create a{' '}
          <Link to='/host'>listing in this area</Link>!
        </Paragraph>
      </div>
    );

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className='listings__title'>
      Results for "{listingsRegion}"
    </Title>
  ) : null;

  return (
    <Content className='listings'>
      {listingsRegionElement}
      {listingsSectionElement}
    </Content>
  );
};
