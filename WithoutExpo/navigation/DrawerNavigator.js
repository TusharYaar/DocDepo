import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
// import QuickActions from "react-native-quick-actions";

import {DeviceEventEmitter} from 'react-native';
import CustomDrawer from './CustomDrawer';

import {
  AppStackNavigator,
  FeedbackNavigator,
  HelpNavigator,
  SettingsNavigator,
} from './StackNavigators';

const Drawer = createDrawerNavigator();

const doSomethingWithTheAction = data => {
  console.log(data.title);
  console.log(data.type);
  console.log(data.userInfo);
};

const DrawerNavigator = props => {
  // const navigation = useNavigation();
  DeviceEventEmitter.addListener(
    'quickActionShortcut',
    doSomethingWithTheAction,
  );
  // QuickActions.popInitialAction()
  //   .then(doSomethingWithTheAction)
  //   .catch(console.error);

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashboard" component={AppStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsNavigator} />
      <Drawer.Screen name="Give Feedback" component={FeedbackNavigator} />
      <Drawer.Screen name="Help" component={HelpNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
