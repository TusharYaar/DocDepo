import React from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'
import IconButton from "../components/IconButton";

const DocsDashboard = () => {
    return (
        <View>
            <Text>This is Docs dashboard</Text>
        </View>
    )
}

export default DocsDashboard

const styles = StyleSheet.create({})


export const docsScreenOptions = ({ navigation, route }) => {
    return { 
        title: "Docs" ,
        headerLeft: () => (
            <IconButton
              onPress={() => navigation.toggleDrawer()}
              icon="menu"
              color="black"
            />
          ),
    }
}