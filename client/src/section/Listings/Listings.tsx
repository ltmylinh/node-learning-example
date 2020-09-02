import React from 'react';

import { server } from '../../lib/api';
import { Console } from 'console';

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
    const listings = await server.fetch({ query: QUERY_LISTINGS });
    console.log(listings);
  };

  return (
    <>
      <h1>{title}</h1>
      <button onClick={fetchListings}>Fetch Listing</button>
    </>
  );
};
