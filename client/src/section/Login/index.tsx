import React, { useEffect, useRef } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { Layout, Typography, Card, Spin } from 'antd';

import googleLogo from './assets/google_logo.jpg';
import { Viewer } from '../../lib/types';
import { AUTH_URL } from '../../lib/graphql/queries';
import { LOG_IN } from '../../lib/graphql/mutations';
import {
  LogIn as LogInData,
  LogInVariables,
} from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { AuthUrl as IAuthUrl } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';

import { ErrorBanner } from '../../lib/components';
import {
  displaySuccessNotification,
  displayErrorMessage,
} from '../../lib/utils';

const { Content, Header } = Layout;
const { Text, Title } = Typography;

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: Props) => {
  const client = useApolloClient();

  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data?.logIn) {
        setViewer(data.logIn);

        //set token in session storage
        if (data.logIn?.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }

        displaySuccessNotification("You've successfully logged in!");
      }
    },
  });

  //hold the orginal logIn
  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      logInRef.current({ variables: { input: { code } } });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<IAuthUrl>({ query: AUTH_URL });
      if (data) {
        window.location.href = data.authUrl;
      }
    } catch (error) {
      displayErrorMessage(
        "Sorry! We weren't able to log you in. Please try again later!"
      );
    }
  };

  if (logInLoading) {
    return (
      <Content className='log-in'>
        <Spin size='large' tip='Logging you in...' />
      </Content>
    );
  }

  const logInErrorBanner = logInError ? (
    <ErrorBanner description="We weren't able to log you in. Please try again soon." />
  ) : null;

  //redirect to user detail page
  if (logInData?.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  return (
    <Content className='log-in'>
      {logInErrorBanner}
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
