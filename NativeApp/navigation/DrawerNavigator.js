import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';
import Settings from "../screens/Settings"

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Dashboard" component={TabNavigator} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
    )
}

export default DrawerNavigator;
