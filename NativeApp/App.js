import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_800ExtraBold

} from '@expo-google-fonts/manrope';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';

import AppNavigator from "./navigation/AppNavigator"


const App = () => {
  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_800ExtraBold

  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
      <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
