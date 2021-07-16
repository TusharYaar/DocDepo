import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DocsDashboard, {docsScreenOptions} from "../screens/DocsDashboard";
import NotesDashboard,{notesScreenOptions} from '../screens/NotesDashboard';
import AddNoteScreen,{addNoteScreenOptions} from '../screens/AddNoteScreen';
import CameraScreen from '../screens/CameraScreen';
import PhotoViewScreen from '../screens/PhotoViewScreen';
const StackDocs = createStackNavigator();
const StackNotes = createStackNavigator();


export const DocsNavigator = () => {
    return (
        <StackDocs.Navigator>
        <StackDocs.Screen name="Docs" component={DocsDashboard} options={docsScreenOptions} />
        <StackDocs.Screen name="Camera" component={CameraScreen} />
        <StackDocs.Screen name="PhotoView" component={PhotoViewScreen} />


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