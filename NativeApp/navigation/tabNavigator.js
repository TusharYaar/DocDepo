import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {NotesNavigator, DocsNavigator} from "./stackNavigators";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = ()=> {
  return (
    <Tab.Navigator options={{shifting:true}}>
      <Tab.Screen name="Docs" component={DocsNavigator} />
      <Tab.Screen name="Notes" component={NotesNavigator} />
    </Tab.Navigator>
  );
}

export default TabNavigator;