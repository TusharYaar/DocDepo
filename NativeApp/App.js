import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_800ExtraBold

} from '@expo-google-fonts/manrope';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
const App = () => {
  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_800ExtraBold

  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: "Manrope_800ExtraBold"}}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
