import React from 'react';

import { StyleSheet, Text, View } from 'react-native'

import { Snackbar, FAB, IconButton } from "react-native-paper";


const HelpScreen = () => {
    return (
        <View>
            <Text>Help Screen</Text>
        </View>
    )
}

export default HelpScreen

const styles = StyleSheet.create({})

export const helpScreenOptions = ({ navigation }) => {
    return {
      title: "Help",
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.toggleDrawer()}
          icon="menu"
        />
      ),
      headerTitleStyle: {
        fontFamily: "Manrope_700Bold",
        fontWeight: "normal",
      },
    };
  };