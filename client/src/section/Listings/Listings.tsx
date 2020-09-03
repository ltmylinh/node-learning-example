import React from 'react';

import { server } from '../../lib/api';
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from './types';

interface Props {
  title: string;
}

const QUERY_LISTINGS = `
  query Listings {
    listings{
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

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!){
    deleteListing(id: $id){
      id
    }
  }
`;

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({
      query: QUERY_LISTINGS,
    });
    console.log(data.listings);
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: '5f4faac356f7da38a2f08f3f',
      },
    });

    console.log(data);
  };

  return (
    <>
      <h1>{title}</h1>
      <button onClick={fetchListings}>Fetch Listing</button>
      <button onClick={deleteListing}>Delete Listing</button>
    </>
  );
};
