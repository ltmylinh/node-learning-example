import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import { List, Avatar, Button, Spin, Alert } from 'antd';

import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from './types';

import { ListingsSkeleton } from './components';
import './styles/listings.css';

interface Props {
  title: string;
}

const QUERY_LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

export const Listings = ({ title }: Props) => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(
    QUERY_LISTINGS
  );

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const onDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = (data?.listings && data.listings) || null;

  const listingList = listings ? (
    <List
      itemLayout='horizontal'
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type='primary'
              size='small'
              onClick={() => onDeleteListing(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape='square' size='large' />}
          />
        </List.Item>
      )}
    ></List>
  ) : null;

  if (loading) {
    return (
      <div className='listings'>
        <ListingsSkeleton title={title} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='listings'>
        <ListingsSkeleton title={title} error />
      </div>
    );
  }

  return (
    <div className='listings'>
      <Spin spinning={deleteListingLoading}>
        <h2>{title}</h2>
        {deleteListingError && (
          <Alert type='error' message='Failed to delete...' />
        )}
        {listingList}
      </Spin>
    </div>
  );
};
