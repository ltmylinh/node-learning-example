import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, useMutation } from 'react-apollo';
import { Layout, Affix, Spin } from 'antd';

import * as serviceWorker from './serviceWorker';
import { Viewer } from './lib/types';
import { LOG_IN } from './lib/graphql/mutations';
import {
  LogIn as LogInData,
  LogInVariables,
} from './lib/graphql/mutations/LogIn/__generated__/LogIn';

import { AppHeaderSkeleton, ErrorBanner } from './lib/components';

import {
  AppHeader,
  Home,
  Listing,
  Listings,
  Host,
  NotFound,
  User,
  Login,
} from './section';
import './styles/index.css';

const client = new ApolloClient({
  uri: '/api',
  request: async (operation) => {
    const token = sessionStorage.getItem('token');
    operation.setContext({
      headers: {
        'X-CSRF-TOKEN': token || '',
      },
    });
  },
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);

  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data?.logIn) {
        setViewer(data.logIn);

        //set token in session storage
        if (data.logIn?.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className='app-skeleton'>
        <AppHeaderSkeleton />
        <div className='app-skeleton__spin-section'>
          <Spin size='large' tip='Launching App' />
        </div>
      </Layout>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <Router>
      <Layout id='app'>
        {logInErrorBannerElement}
        <Affix offsetTop={0} className='app__affix-header'>
          <AppHeader {...{ viewer, setViewer }} />
        </Affix>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/host' component={Host} />
          <Route exact path='/listing/:id' component={Listing} />
          <Route exact path='/listings/:location?' component={Listings} />
          <Route exact path='/user/:id' component={User} />
          <Route
            exact
            path='/login'
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
