import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { IconButton } from "react-native-paper";

const Settings = () => {
    return (
        <View>
            <Text>This is settings</Text>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({})

export const settingsScreenOptions = ({ navigation }) => {
    return {
      title: "Settings",
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