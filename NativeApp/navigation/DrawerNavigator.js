import React, { useState } from "react";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
// import DrawerNavigatorOptions from './DrawerNavigatorOptions';

import TabNavigator from "./TabNavigator";
import Settings from "../screens/Settings";

import { useDispatch } from "react-redux";
const Drawer = createDrawerNavigator();
import { logoutUser } from "../store/actions/user";

const DrawerNavigator = (props) => {
  // const [t,r] = useState("");
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={() => {
                dispatch(logoutUser());
              }}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Dashboard" component={TabNavigator} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
