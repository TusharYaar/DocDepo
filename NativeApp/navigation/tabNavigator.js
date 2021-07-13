import React from "react";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NotesNavigator, DocsNavigator } from "./stackNavigators";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator options={{ shifting: true }}>
      <Tab.Screen
        name="Notes"
        component={NotesNavigator}
        options={{
          tabBarIcon: ({ color }) =>
            Platform.OS === "android" ? (
              <MaterialCommunityIcons
                name="card-text"
                size={24}
                color={color}
              />
            ) : <Ionicons name="ios-text" size={24} color={color} />,
        }}
      />
      <Tab.Screen name="Docs" component={DocsNavigator} options={{
          tabBarIcon: ({ color }) =>
            Platform.OS === "android" ? (
              <MaterialCommunityIcons name="file-document" size={24} color={color}/>
            ) : <Ionicons name="ios-document" size={24} color={color} />,
        }}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;
