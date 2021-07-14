import React from "react";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NotesNavigator, DocsNavigator } from "./stackNavigators";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import IconButton from "../components/IconButton";
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator options={{ shifting: true }}>
      <Tab.Screen
        name="Notes"
        component={NotesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <IconButton
              onPress={() => {}}
              icon="card-text"
              iconIson="ios-text"
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Docs"
        component={DocsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <IconButton
              onPress={() => {}}
              icon="file-document"
              iconIson="ios-document"
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
