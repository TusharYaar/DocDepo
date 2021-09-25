import React, {useState, useRef} from 'react';
import { StyleSheet, View, ScrollView,Platform, Dimensions, Alert } from 'react-native'

import {IconButton, Button, TextInput  } from "react-native-paper";

import LottieView from 'lottie-react-native';


import Header from "../components/Header";
import {useSelector} from 'react-redux';

import {firestore} from "../config";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const user = useSelector((state) => state.user.uid);
  const userEmail = useSelector((state) => state.user.email);
  const visualizerRef = useRef(null);


  const submitFeedback = async () => {
    setIsLoading(true);
    try {
    await firestore.collection("feedbacks").add({
      feedback,
      windowHeight,
      windowWidth,
      OS: Platform.OS,
      version: Platform.Version,
      user,
      userEmail
    });
    setFeedback('');
    setPlayAnimation(true);
    visualizerRef.current.play();
  } catch (err) {
  Alert.alert("Unable to submit feedback", err.message)
  }
  setIsLoading(false);
  }
  if (playAnimation) return <LottieView
  ref={visualizerRef}
  style={{
  flex: 1,
  backgroundColor: "#fff"
  }}
  source={require('../assets/lottie/feedbackSent.json')}
  loop={false}
  onAnimationFinish={()=> setPlayAnimation(false)}
       />

    return (
      <View style={styles.screen}>
        
        <ScrollView >
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
            <Button mode={Platform.OS === "android" ? "contained" : "text"} disabled={isLoading || feedback.length < 4} onPress={submitFeedback}>Submit</Button>
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
        />
      ),
      headerTitleStyle: {
        fontFamily: "Manrope_700Bold",
        fontWeight: "normal",
      },
    };
  };