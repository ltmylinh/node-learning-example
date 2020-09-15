import React from 'react';
import { Skeleton, Alert, Divider } from 'antd';

import '../styles/listingsSkeleton.css';

interface Props {
  title: string;
  error?: boolean;
}
export const ListingsSkeleton = ({ title, error }: Props) => {
  return (
    <div className='listings-skeleton'>
      <h2>{title}</h2>
      {error && (
        <Alert
          type='error'
          message='Opps! Something is wrong with fetching data. Please try it later...'
        />
      )}
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
    </div>
  );
};
