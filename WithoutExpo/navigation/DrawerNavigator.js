import React from "react";

import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { Button } from "react-native-paper";

import CustomDrawer from "./CustomDrawer";

import TabNavigator from "./TabNavigator";

import {
  FeedbackNavigator,
  HelpNavigator,
  SettingsNavigator,
} from "./StackNavigators";

import { useDispatch } from "react-redux";
const Drawer = createDrawerNavigator();
import { logoutUser } from "../store/actions/user";

const DrawerNavigator = (props) => {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={TabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsNavigator} />
      <Drawer.Screen name="Give Feedback" component={FeedbackNavigator} />
      <Drawer.Screen name="Help" component={HelpNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
