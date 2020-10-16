import React, { useState, useEffect } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Input } from 'antd';

import { Viewer } from '../../lib/types';
import logo from './assets/tinyhouse-logo.png';
import { MenuItems } from './components';

const { Header } = Layout;
const { Search } = Input;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = withRouter(
  ({ viewer, setViewer, location, history }: Props & RouteComponentProps) => {
    const onSearch = (value: string) => {
      history.push(`/listings/${value}`);
    };

    return (
      <Header className='app-header'>
        <div className='app-header__logo-search-section'>
          <div className='app-header__logo'>
            <Link to='/'>
              <img src={logo} alt='App logo' />
            </Link>
          </div>
          <div className='app-header__search-input'>
            <Search
              placeholder="Search 'San Francisco'"
              enterButton
              onSearch={onSearch}
            />
          </div>
        </div>
        <div className='app-header__menu-section'>
          <MenuItems viewer={viewer} setViewer={setViewer} />
        </div>
      </Header>
    );
  }
);
