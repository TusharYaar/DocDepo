import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import DocsDashboard, { docsScreenOptions } from "../screens/DocsDashboard";
import NotesDashboard, { notesScreenOptions } from "../screens/NotesDashboard";
import AddNoteScreen, { addNoteScreenOptions } from "../screens/AddNoteScreen";
import CameraScreen from "../screens/CameraScreen";
import AudioScreen from "../screens/AudioScreen";
import FeedbackScreen, {
  feedbackScreenOptions,
} from "../screens/FeedbackScreen";
import HelpScreen, { helpScreenOptions } from "../screens/HelpScreen";
import Settings, { settingsScreenOptions } from "../screens/Settings";

import PhotoViewScreen from "../screens/PhotoViewScreen";
const AppStack = createStackNavigator();
const StackReport = createStackNavigator();
const StackHelp = createStackNavigator();
const StackSettings = createStackNavigator();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Dashboard"
        component={TabNavigator}
        options={docsScreenOptions}
      />
      <AppStack.Screen
        name="Camera"
        component={CameraScreen}
        options={fontOptions}
      />
      <AppStack.Screen
        name="PhotoView"
        component={PhotoViewScreen}
        options={fontOptions}
      />
      <AppStack.Screen
        name="Audio"
        component={AudioScreen}
        options={fontOptions}
      />
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
        name="report"
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
        name="report"
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
        name="report"
        component={HelpScreen}
        options={helpScreenOptions}
      />
    </StackHelp.Navigator>
  );
};

const fontOptions = {
  headerTitleStyle: {
    fontFamily: "Manrope_700Bold",
    fontWeight: "normal",
  },
};
