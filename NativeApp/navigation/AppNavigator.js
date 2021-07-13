import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import TabNavigator from './TabNavigator';

import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen'

const AppNavigator= () => {
  const user = useSelector(state => state.user);
  return (
    <NavigationContainer>
      {!user.accessToken && !user.uid && user.autoLogin && <LoadingScreen />}
      {!user.accessToken && !user.uid && !user.autoLogin && <LoginScreen />}
      {!!user.accessToken && !!user.uid &&  <TabNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;