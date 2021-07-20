import React, {useState} from 'react';
import { StyleSheet, View, ScrollView,Platform, Dimensions } from 'react-native'

import {IconButton, Button, TextInput  } from "react-native-paper";

import Header from "../components/Header";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    return (
      <View style={styles.screen}>
        <ScrollView >
            <Header>
                Feedback
            </Header>
            <View style={styles.container}>
            <TextInput
      label="Feedback"
      multiline
      numberOfLines={5}
      value={feedback}
      onChangeText={text => setFeedback(text)}
      disabled={isLoading}
      />
      </View>
        </ScrollView>
            <Button mode={Platform.OS === "android" ? "contained" : "text"} disabled={isLoading || feedback.length < 4}>Submit</Button>
      </View>
    )
}

export default FeedbackScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  container: {
    marginVertical: 15,
  }
})

export const feedbackScreenOptions = ({ navigation }) => {
    return {
      title: "Give Feedback",
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.toggleDrawer()}
          icon="menu"
          color="black"
        />
      ),
    };
  };