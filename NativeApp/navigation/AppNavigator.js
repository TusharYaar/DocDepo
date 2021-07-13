import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import TabNavigator from './TabNavigator';

import LoginScreen from '../screens/LoginScreen';

const AppNavigator= () => {
  const user = useSelector(state => state.user);
  return (
    <NavigationContainer>
      {!user.accessToken && !user.uid && <LoginScreen />}
      {!!user.accessToken && !!user.uid &&  <TabNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;