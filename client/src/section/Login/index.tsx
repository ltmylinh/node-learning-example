import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Layout, Typography, Card } from 'antd';

import googleLogo from './assets/google_logo.jpg';
import { Viewer } from '../../lib/types';
import { AUTH_URL } from '../../lib/graphql/queries';
import { AuthUrl as IAuthUrl } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';

const { Content } = Layout;
const { Text, Title } = Typography;

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: Props) => {
  const client = useApolloClient();

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<IAuthUrl>({ query: AUTH_URL });
      if (data) {
        window.location.href = data.authUrl;
      }
    } catch (error) {}
  };

  return (
    <Content className='log-in'>
      <Card className='log-in-card'>
        <div className='log-in-card__intro'>
          <Title level={3} className='log-in-card__intro-title'>
            <span role='img' aria-label='wave'>
              👋
            </span>
          </Title>
          <Title level={3} className='log-in-card__intro-title'>
            Log in to TinyHouse!
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button
          className='log-in-card__google-button'
          onClick={handleAuthorize}
        >
          <img
            src={googleLogo}
            alt='Google Logo'
            className='log-in-card__google-button-logo'
          />
          <span className='log-in-card__google-button-text'>
            Sign in with Google
          </span>
        </button>
        <Text type='secondary'>
          Note: By signing in, you'll be redirected to the Google consent form
          to sign in with your Google account.
        </Text>
      </Card>
    </Content>
  );
};
