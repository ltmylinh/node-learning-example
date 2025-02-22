import { gql } from 'apollo-boost';

export const LISTINGS = gql`
  query Listings(
    $location: String
    $filter: ListingFilter!
    $limit: Int!
    $page: Int!
  ) {
    listings(location: $location, filter: $filter, limit: $limit, page: $page) {
      region
      total
      result {
        id
        title
        image
        address
        price
        numOfGuests
      }
    }
  }
`;
