import React from 'react';

import { server } from '../../lib/api';
import { ListingsData } from './types';

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

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({
      query: QUERY_LISTINGS,
    });
    console.log(data.listings);
  };

  return (
    <>
      <h1>{title}</h1>
      <button onClick={fetchListings}>Fetch Listing</button>
    </>
  );
};
