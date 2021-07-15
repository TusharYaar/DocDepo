import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";

import { useSelector,useDispatch } from "react-redux";
import {addMultipleNotes,deleteNote} from "../store/actions/notes";
import { firestore } from "../config";

import IconButton from "../components/IconButton";
import Notes from "../components/Notes";
import AddButton from "../components/AddButton";

const NotesDashboard = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes);
  const fetchDocsFromFirestore = useCallback(async () => {
    setIsLoading(true);
    try {
      
      const querySnapshot = await firestore
      .collection("notesDepo")
      .where("user", "==", userId)
      .get();
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      dispatch(addMultipleNotes(arr));
      setIsLoading(false);
    }
    catch(err) {
      console.error(err.message);
    }
  }, [firestore,dispatch,userId]);

  useEffect(() => {
    fetchDocsFromFirestore();
  }, [fetchDocsFromFirestore]);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  const handleDeleteFromCollection = async (note) => {
    setIsLoading(true);
    try {
      await firestore.collection("notesDepo").doc(note).delete();
      dispatch(deleteNote({id: note}))
    }
    catch (err) {
      Alert.alert("Error", err.message,[{
        text: "Ok",
        style: "cancel",
      },]);
    }
    setIsLoading(false);
  };
  const handleDelete = (note) => {
    Alert.alert("Delete Note", "This note will be deleted", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => handleDeleteFromCollection(note),
        style: "destructive",
      },
    ]);
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <Notes
            note={item}
            copyToClipboard={() => copyToClipboard(item.text)}
            deleteNote={() => handleDelete(item.id)}
            disabled={isLoading}
          />
        )}
        refreshing={isLoading}
        onRefresh={fetchDocsFromFirestore}
      />
      <AddButton onPress={() => navigation.navigate("AddNote")} />
    </View>
  );
};

export default NotesDashboard;

const styles = StyleSheet.create({
  drawerIcon: { marginLeft: 10 },
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
