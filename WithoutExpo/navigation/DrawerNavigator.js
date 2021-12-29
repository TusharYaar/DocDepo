import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "./CustomDrawer";

import {
  AppStackNavigator,
  FeedbackNavigator,
  HelpNavigator,
  SettingsNavigator,
} from "./StackNavigators";

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={AppStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsNavigator} />
      <Drawer.Screen name="Give Feedback" component={FeedbackNavigator} />
      <Drawer.Screen name="Help" component={HelpNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
