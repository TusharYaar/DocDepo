import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import DrawerNavigator from './DrawerNavigator';

import LoginScreen from '../screens/LoginScreen';
import THEMES from '../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setInitialTheme} from '../store/actions/theme';
const AppNavigator = () => {
  const user = useSelector(state => state.user);
  const currentTheme = useSelector(state => state.theme.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTheme = async () => {
      const value = await AsyncStorage.getItem('@docdepo_theme');
      var theme = value ? value : 'lightTheme';
      dispatch(setInitialTheme(theme));
    };
    getTheme();
  }, [dispatch]);
  return (
    <PaperProvider theme={THEMES[currentTheme]}>
      <StatusBar
        backgroundColor={THEMES[currentTheme].colors.surface}
        barStyle={THEMES[currentTheme].dark ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer theme={THEMES[currentTheme]}>
        {!user.uid && <LoginScreen />}
        {!!user.uid && <DrawerNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigator;
