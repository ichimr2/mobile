import React from 'react';
import {LoginSignUpController} from '../../modules/loginSignup/LoginSignUpController';
import {LandingStackParamList} from '../LandingNavigator';
import {RouteProp} from '@react-navigation/native';

type RootStackListProps = RouteProp<LandingStackParamList, 'LoginSignUp'>;

type LoginSignUpPageProp = {
  route: RootStackListProps;
};

export const LoginSignUpPage: React.FC<LoginSignUpPageProp> = ({route}) => {
  return <LoginSignUpController page={route.params.page} />;
};
