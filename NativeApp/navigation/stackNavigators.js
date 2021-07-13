import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DocsDashboard, {docsScreenOptions} from "../screens/DocsDashboard";
import NotesDashboard from '../screens/NotesDashboard';

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
        <StackNotes.Screen name="Home" component={NotesDashboard} />
      </StackNotes.Navigator>
    )
}