import React from "react";

import { StyleSheet, ScrollView, View } from "react-native";

import { IconButton } from "react-native-paper";

import Title from "../components/Title";
import Body from "../components/Body";
import Header from "../components/Header";
const HelpScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.section}>
        <Body>
          Here you can find general information about the app and methods to
          perform some activities.
        </Body>
      </View>
      <View style={styles.section}>
        <Header> Notes </Header>
        <Title>Uploading Notes</Title>
        <Body>
          Uploading notes is simple, go to notes tab on the bottom, click the
          button on the bottom right and add the note. THe minimum length for a
          note is 3 and maximum length is 120 characters. You can also paste
          your last copied text, but you might encounter some error.
        </Body>
      </View>
      <View style={styles.section}>
        <Title>Refreshing Notes</Title>
        <Body>You can use pull to refresh notes and even docs.</Body>
      </View>
      <View style={styles.section}>
        <Title>Copy Notes</Title>
        <Body>
          You can also copy the notes by simply clicking the copy button on the
          note you want to copy
        </Body>
      </View>
      <View style={styles.section}>
        <Title>Deleting Notes</Title>
        <Body>
          You can easily delete notes by clicking the delete button on the note
          you want to delete and then confirming by clicking on ok on the
          alert/dialog box.
        </Body>
      </View>
      {/* //////////////////////////////////Notes Complete */}
      <View style={styles.section}>
        <Header> Docs </Header>
        <Title>Uploading Docs</Title>
        <Body>
          Docs refers to anything that is a file. Photo, audio, video, document
          e.t.c. To upload any doc, choose the add button in docs tab, click
          document and choose the desired document.
        </Body>
      </View>
      <View style={styles.section}>
        <Title>Refreshing Docs</Title>
        <Body>The app does not have an auto refresh, and thus you have to scroll to refresh the docs, similar to notes.</Body>
      </View>
      <View style={styles.section}>
        <Title>Share Notes</Title>
        <Body>
          You can easily share Docs with apps that suppot sharing. Clicking on share button on the doc you want to share and choose the app you want to share with.
          It will first download the file from the server and then share the file instead of url.  
        </Body>
      </View>
      <View style={styles.section}>
        <Title>Downloading Docs</Title>
        <Body>
            This is tricky. The technologies used to build this app doesnot allow a convenient way to download docs to user accessible folder. Thus to download a 
            doc, click on share and then save to device. 
        </Body>
      </View>
      <View style={styles.section}>
        <Title>Deleting Docs</Title>
        <Body>
          You can easily delete docs by clicking the delete button on the doc
          you want to delete and then confirming by clicking on ok on the
          alert/dialog box.
        </Body>
      </View>
      {/* //////////////////////////////////// */}
      <View style={styles.section}>
        <Header> Pictures </Header>
        <Title>Clicking Pictures</Title>
        <Body>
         You can also click a picture from the app and upload it to the server. The clicked picture doesnot get saved to you gallery.

        </Body>
      </View>
      <View style={styles.section}>
        <Header> Audio </Header>
        <Title>Recording Audio</Title>
        <Body>
          You can also record audio from the app and upload it to the server. Its very simple. 
        </Body>
      </View>
      <View style={styles.section}>
        <Header> Feedback </Header>
        <Title>Giving Feedback</Title>
        <Body>
         The app is a learning tool for me and thus feedback is very important. 
         You can give feedback by clicking the feedback button from the drawer.
         You can also report any errors you faced from the feedback only. Giving feedback also included
         imformation about you operating system, to help me diagonose the problem. 
        </Body>
      </View>
      <View style={styles.section}>
        <Header> Theme </Header>
        <Title>Setting Theme</Title>
        <Body>
          You can choose between a light and a dark theme from the settings menu.
          Changing themes require you to restart the app.     
        </Body>
      </View>
      <View style={styles.section}>
        <Body>
           Made by Tusharyaar
        </Body>
      </View>
    </ScrollView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  section: {
    marginVertical: 15,
  },
});

export const helpScreenOptions = ({ navigation }) => {
  return {
    title: "Help",
    headerLeft: () => (
      <IconButton onPress={() => navigation.toggleDrawer()} icon="menu" />
    ),
    headerTitleStyle: {
      fontFamily: "Manrope_700Bold",
      fontWeight: "normal",
    },
  };
};
