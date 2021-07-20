import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

import { Snackbar, FAB, IconButton } from "react-native-paper";

const ReportProblemScreen = () => {
    return (
        <View>
            <Text>
                Report Problem Screen
            </Text>
        </View>
    )
}

export default ReportProblemScreen

const styles = StyleSheet.create({})

export const rpScreenOptions = ({ navigation }) => {
    return {
      title: "Report a problem",
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.toggleDrawer()}
          icon="menu"
          color="black"
        />
      ),
    };
  };