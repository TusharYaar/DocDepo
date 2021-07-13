import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IconButton from "../components/IconButton";

const NotesDashboard = () => {
    return (
        <View>
            <Text>This is Notes Dashboard</Text>
        </View>
    )
}

export default NotesDashboard

const styles = StyleSheet.create({})

export const notesScreenOptions = ({ navigation, route }) => {
    return { 
        title: "Notes" ,
        headerLeft: () => (
            <IconButton
              onPress={() => navigation.toggleDrawer()}
              icon="menu"
              color="black"
            />
          ),
    }
}