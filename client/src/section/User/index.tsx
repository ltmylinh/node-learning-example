import React from 'react';
import { useQuery } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Layout, Row } from 'antd';

import { USER } from '../../lib/graphql/queries';
import {
  User as UserData,
  UserVariables,
} from '../../lib/graphql/queries/User/__generated__/User';

import { UserProfile } from './components';

interface MatchParams {
  id: string;
}

const { Content } = Layout;

export const User = ({ match }: RouteComponentProps<MatchParams>) => {
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: { id: match.params.id },
  });

  const user = data?.user || null;
  const userProfileElm = user ? <UserProfile user={user} /> : null;

  return (
    <Content className='user'>
      <Row gutter={12} justify='space-between'>
        <Col xs={24}>{userProfileElm}</Col>
      </Row>
    </Content>
  );
};
