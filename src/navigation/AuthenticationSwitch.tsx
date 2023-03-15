import React from 'react';
import {useMeQuery} from '../generated/graphql';
import {LandingNavigator} from './LandingNavigator';
import {Loading} from './Loading';
import {MainNavigator} from './MainNavigator';

const AuthenticationSwitch: React.FC = () => {
  const [{data, fetching}] = useMeQuery();

  if (fetching) {
    return <Loading />;
  }

  if (!data?.me) {
    return <LandingNavigator />;
  }

  return <MainNavigator />;
};

export default AuthenticationSwitch;
