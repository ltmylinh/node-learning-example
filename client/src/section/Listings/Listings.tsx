import React, { useState, useEffect } from 'react';

import { server, useQuery } from '../../lib/api';
import {
  Listing,
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
  const { data } = useQuery<ListingsData>(QUERY_LISTINGS);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({
      query: QUERY_LISTINGS,
    });
  };

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    fetchListings();
  };

  const listings = (data?.listings && data.listings) || null;
  const listingList = listings ? (
    <ul>
      {listings.map(({ id, title }) => (
        <li key={id}>
          {title}
          <button onClick={() => deleteListing(id)}>Delete</button>
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <>
      <h1>{title}</h1>
      {listingList}
    </>
  );
};
