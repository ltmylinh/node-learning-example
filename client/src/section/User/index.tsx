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
import { Viewer } from '../../lib/types';

import { ErrorBanner, PageSkeleton } from '../../lib/components';

interface MatchParams {
  id: string;
}

interface Props {
  viewer: Viewer;
}

const { Content } = Layout;

export const User = ({
  match,
  viewer,
}: Props & RouteComponentProps<MatchParams>) => {
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: { id: match.params.id },
  });

  if (loading) {
    return (
      <Content className='user'>
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className='user'>
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data?.user || null;
  const viewerIsUser = viewer.id === match.params.id;
  const userProfileElm = user ? (
    <UserProfile user={user} viewerIsUser={viewerIsUser} />
  ) : null;

  return (
    <Content className='user'>
      <Row gutter={12} justify='space-between'>
        <Col xs={24}>{userProfileElm}</Col>
      </Row>
    </Content>
  );
};
