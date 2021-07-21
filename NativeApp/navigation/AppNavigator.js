import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

import DrawerNavigator from "./DrawerNavigator"

import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen'

const AppNavigator= (props) => {
  const {theme} = props;
  const user = useSelector(state => state.user);
  return (
    <NavigationContainer theme={theme}>
      {!user.accessToken && !user.uid && user.autoLogin && <LoadingScreen />}
      {!user.accessToken && !user.uid && !user.autoLogin && <LoginScreen />}
      {!!user.accessToken && !!user.uid &&  <DrawerNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;