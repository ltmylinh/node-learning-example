import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';

// import { useQuery, useMutation } from '../../lib/api';
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from './types';

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
    <ul>
      {listings.map(({ id, title }) => (
        <li key={id}>
          {title}
          <button onClick={() => onDeleteListing(id)}>Delete</button>
        </li>
      ))}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <h2>Something is wrong with fetching data. Please try it later...</h2>
    );
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h2>Deleting in progress...</h2>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h2>Failed to delete...</h2>
  ) : null;

  return (
    <>
      <h1>{title}</h1>
      {listingList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </>
  );
};
