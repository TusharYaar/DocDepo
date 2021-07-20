import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

import { Snackbar, FAB, IconButton } from "react-native-paper";

const FeedbackScreen = () => {
    return (
        <View>
            <Text>
                Feedback Screen
            </Text>
        </View>
    )
}

export default FeedbackScreen

const styles = StyleSheet.create({})

export const feedbackScreenOptions = ({ navigation }) => {
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