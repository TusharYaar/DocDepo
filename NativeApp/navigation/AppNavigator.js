import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';


import TabNavigator from './TabNavigator';

const AppNavigator= () => {
  return (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;