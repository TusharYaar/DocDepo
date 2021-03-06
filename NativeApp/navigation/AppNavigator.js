import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useSelector,useDispatch} from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from "expo-status-bar";

import DrawerNavigator from "./DrawerNavigator"

import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';

import THEMES from "../themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {setInitialTheme} from '../store/actions/theme';
const AppNavigator= (props) => {
  const user = useSelector(state => state.user);
  const currentTheme = useSelector(state => state.theme.value);
  const dispatch = useDispatch();
  
  useEffect(()=> {
    const getTheme = async () => {
    const value = await AsyncStorage.getItem("@docdepo_theme");
      theme = value ? value : "lightTheme";
      dispatch(setInitialTheme(theme));
    }
    getTheme();
  },[dispatch])
  return (
    <PaperProvider theme={THEMES[currentTheme]}>
      <StatusBar style={THEMES[currentTheme].dark ? "light": "dark"} />
    <NavigationContainer theme={THEMES[currentTheme]}>
      {!user.accessToken && !user.uid && user.autoLogin && <LoadingScreen />}
      {!user.accessToken && !user.uid && !user.autoLogin && <LoginScreen />}
      {!!user.accessToken && !!user.uid &&  <DrawerNavigator />}
    </NavigationContainer>
    </PaperProvider>

  );
}

export default AppNavigator;