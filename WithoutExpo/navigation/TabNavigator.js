import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import { NotesNavigator, DocsNavigator } from "./StackNavigators";
import DocsDashboard, {docsScreenOptions} from '../screens/DocsDashboard';
import NotesDashboard, {notesScreenOptions} from '../screens/NotesDashboard';
import IconButton from '../components/IconButton';
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator options={{shifting: true}}>
      <Tab.Screen
        name="Notes"
        component={NotesDashboard}
        options={{
          tabBarIcon: ({color}) => (
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
        component={DocsDashboard}
        options={{
          tabBarIcon: ({color}) => (
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
