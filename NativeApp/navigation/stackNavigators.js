import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DocsDashboard, {docsScreenOptions} from "../screens/DocsDashboard";
import NotesDashboard,{notesScreenOptions} from '../screens/NotesDashboard';
import AddNoteScreen,{addNoteScreenOptions} from '../screens/AddNoteScreen';
import CameraScreen from '../screens/CameraScreen';
import AudioScreen from '../screens/AudioScreen';
import FeedbackScreen, {feedbackScreenOptions} from "../screens/FeedbackScreen";
import HelpScreen,{helpScreenOptions} from "../screens/HelpScreen"
import Settings,{settingsScreenOptions} from "../screens/Settings";


import PhotoViewScreen from '../screens/PhotoViewScreen';
const StackDocs = createStackNavigator();
const StackNotes = createStackNavigator();
const StackReport = createStackNavigator();
const StackHelp = createStackNavigator();
const StackSettings = createStackNavigator();

export const DocsNavigator = () => {
    return (
        <StackDocs.Navigator>
        <StackDocs.Screen name="Docs" component={DocsDashboard} options={docsScreenOptions} />
        <StackDocs.Screen name="Camera" component={CameraScreen} />
        <StackDocs.Screen name="PhotoView" component={PhotoViewScreen} />
        <StackDocs.Screen name="Audio" component={AudioScreen} />
      </StackDocs.Navigator>
    )
  }
  
  export const NotesNavigator = () => {
    return (
      <StackNotes.Navigator>
        <StackNotes.Screen name="Notes" component={NotesDashboard} options={notesScreenOptions}  />
          <StackDocs.Screen name="AddNote" component={AddNoteScreen} options={addNoteScreenOptions} />
      </StackNotes.Navigator>
    )
}

export const SettingsNavigator= () => {
  return (
    <StackSettings.Navigator>
      <StackSettings.Screen name="report" component={Settings} options={settingsScreenOptions}  />
    </StackSettings.Navigator>
  )
  }

export const FeedbackNavigator= () => {
  return (
    <StackReport.Navigator>
      <StackReport.Screen name="report" component={FeedbackScreen} options={feedbackScreenOptions}  />
    </StackReport.Navigator>
  )
  }

  export const HelpNavigator= () => {
    return (
      <StackHelp.Navigator>
        <StackHelp.Screen name="report" component={HelpScreen} options={helpScreenOptions}  />
      </StackHelp.Navigator>
    )
    }