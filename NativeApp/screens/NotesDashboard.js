import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as Clipboard from "expo-clipboard";

import { useSelector } from "react-redux";
import { firestore } from "../config";


import IconButton from "../components/IconButton";
import Notes from "../components/Notes";
import AddButton from "../components/AddButton";


const NotesDashboard = (props) => {
  const { navigation } = props;
  const [notes, setNotes] = useState([]);

  const userId = useSelector((state) => state.user.uid);

  const fetchDocsFromFirestore = useCallback(async () => {
    const querySnapshot = await firestore
      .collection("notesDepo")
      .where("user", "==", userId)
      .get();
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() });
    });
    setNotes(arr);
  }, [firestore]);

  useEffect(() => {
    fetchDocsFromFirestore();
  }, [fetchDocsFromFirestore]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={fetchDocsFromFirestore}
          icon="refresh"
          iconIos="ios-refresh-sharp"
          style={styles.refreshIcon}
          color="black"
        />
      ),
    });
  }, [fetchDocsFromFirestore, navigation]);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <Notes
            note={item}
            copyToClipboard={() => copyToClipboard(item.text)}
          />
        )}
      />
      <AddButton onPress={() => navigation.navigate('AddNote')}/>
    </View>
  );
};

export default NotesDashboard;

const styles = StyleSheet.create({
  drawerIcon: { marginLeft: 10 },
  refreshIcon: { marginRight: 10 },
  screen: {
    padding: 10,
    flex: 1,
  },
});

export const notesScreenOptions = ({ navigation }) => {
  return {
    title: "Notes",
    headerLeft: () => (
      <IconButton
        onPress={() => navigation.toggleDrawer()}
        icon="menu"
        iconIos="ios-menu-sharp"
        style={styles.drawerIcon}
        color="black"
      />
    ),
  };
};
