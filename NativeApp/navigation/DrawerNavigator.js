import React from "react";


import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import {Button} from "react-native-paper";


import TabNavigator from "./TabNavigator";

import { ReportProblemNavigator, HelpNavigator,SettingsNavigator } from "./StackNavigators"

import { useDispatch } from "react-redux";
const Drawer = createDrawerNavigator();
import { logoutUser } from "../store/actions/user";

const DrawerNavigator = (props) => {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Button onPress={() => {
                dispatch(logoutUser());
              }}>Logout</Button>
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Dashboard" component={TabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsNavigator} />
      <Drawer.Screen name="Report Problem" component={ReportProblemNavigator} />
      <Drawer.Screen name="Help" component={HelpNavigator} />

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
