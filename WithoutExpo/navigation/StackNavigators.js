import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import {docsScreenOptions} from '../screens/DocsDashboard';
import AddNoteScreen, {addNoteScreenOptions} from '../screens/AddNoteScreen';
// import CameraScreen from '../screens/CameraScreen';
// import AudioScreen from '../screens/AudioScreen';
import FeedbackScreen, {feedbackScreenOptions} from '../screens/FeedbackScreen';
import HelpScreen, {helpScreenOptions} from '../screens/HelpScreen';
import Settings, {settingsScreenOptions} from '../screens/Settings';

// import PhotoViewScreen from '../screens/PhotoViewScreen';
const AppStack = createNativeStackNavigator();
const StackReport = createNativeStackNavigator();
const StackHelp = createNativeStackNavigator();
const StackSettings = createNativeStackNavigator();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={docsScreenOptions}
      />
      {/* <AppStack.Screen
        name="Camera"
        component={CameraScreen}
        options={fontOptions}
      /> */}
      {/*
      <AppStack.Screen
        name="PhotoView"
        component={PhotoViewScreen}
        options={fontOptions}
      />*/}
      {/* <AppStack.Screen
        name="Audio"
        component={AudioScreen}
        options={fontOptions}
      /> */}
      <AppStack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={addNoteScreenOptions}
      />
    </AppStack.Navigator>
  );
};

export const SettingsNavigator = () => {
  return (
    <StackSettings.Navigator>
      <StackSettings.Screen
        name="SettingsScreen"
        component={Settings}
        options={settingsScreenOptions}
      />
    </StackSettings.Navigator>
  );
};

export const FeedbackNavigator = () => {
  return (
    <StackReport.Navigator>
      <StackReport.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={feedbackScreenOptions}
      />
    </StackReport.Navigator>
  );
};

export const HelpNavigator = () => {
  return (
    <StackHelp.Navigator>
      <StackHelp.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={helpScreenOptions}
      />
    </StackHelp.Navigator>
  );
};

const fontOptions = {
  headerTitleStyle: {
    fontFamily: 'Manrope_700Bold',
    fontWeight: 'normal',
  },
};
