import React from 'react';
import { Alert } from 'antd';

interface Props {
  message?: string;
  description?: string;
}
export const ErrorBanner = ({
  message = 'Something went wrong :((',
  description = 'Look like something went wrong. Please check your connection and/or try again later.',
}) => (
  <Alert
    banner
    closable
    type='error'
    className='error-banner'
    message={message}
    description={description}
  />
);
