import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DocsDashboard, {docsScreenOptions} from "../screens/DocsDashboard";
import NotesDashboard,{notesScreenOptions} from '../screens/NotesDashboard';
import AddNoteScreen from '../screens/AddNoteScreen';

const StackDocs = createStackNavigator();
const StackNotes = createStackNavigator();


export const DocsNavigator = () => {
    return (
        <StackDocs.Navigator>
        <StackDocs.Screen name="Home" component={DocsDashboard} options={docsScreenOptions} />
      </StackDocs.Navigator>
    )
  }
  
  export const NotesNavigator = () => {
    return (
      <StackNotes.Navigator>
        <StackNotes.Screen name="Home" component={NotesDashboard} options={notesScreenOptions}  />
          <StackDocs.Screen name="AddNote" component={AddNoteScreen}/>
      </StackNotes.Navigator>
    )
}