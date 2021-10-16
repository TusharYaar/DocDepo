import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

import {
  Avatar,
  Button,
  Headline,
  Caption,
  Subheading,
} from "react-native-paper";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../store/actions/user";

const CustomDrawer = (props) => {
  const dispatch = useDispatch();

  const handleLogoutBtnClick = () => {
    auth().signOut();
    dispatch(logoutUser());
  };

  const user = useSelector((state) => state.user);
  return (
    <SafeAreaView {...props} style={styles.screen}>
      <View>
        <View style={styles.userDetails}>
          <Avatar.Icon size={36} icon="account" />
          <View style={styles.userDetailsText}>
            <Caption>Logged in as:</Caption>
            <Caption>{user.email}</Caption>
          </View>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <View style={styles.flex}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Button onPress={handleLogoutBtnClick} icon="logout-variant">
        Logout
      </Button>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userDetailsText: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mockspacesNumber: {
    padding: 10,
  },
});
