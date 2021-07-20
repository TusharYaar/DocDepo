import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { Snackbar, FAB, IconButton } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

import { useSelector, useDispatch } from "react-redux";
import { addMultipleNotes, deleteNote } from "../store/actions/notes";
import { firestore } from "../config";

import Notes from "../components/Notes";
import EmptyDepo from "../components/EmptyDepo";

const NotesDashboard = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarValues, setSnackbarValues] = useState({
    value: "",
    visible: false,
  });
  const userId = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
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
    } catch (err) {
      console.error(err.message);
    }
  }, [firestore, dispatch, userId]);

  useEffect(() => {
    fetchDocsFromFirestore();
  }, [fetchDocsFromFirestore]);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    setSnackbarValues({ value: "Note Copied to Clipboard", visible: true });
  };

  const handleDeleteFromCollection = async (note) => {
    setIsLoading(true);
    try {
      await firestore.collection("notesDepo").doc(note).delete();
      dispatch(deleteNote({ id: note }));
      setSnackbarValues({ value: "Note Deleted", visible: true });
    } catch (err) {
      Alert.alert("Error", err.message, [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
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
  const onDismissSnackBar = () =>
    setSnackbarValues({ value: "", visible: false });


  return (
    <View style={styles.screen}>
      {notes.length === 0 ? (
        <EmptyDepo />
      ) : (
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
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddNote")}
      />
      <Snackbar
        visible={snackbarValues.visible}
        onDismiss={onDismissSnackBar}
        duration={4000}
      >
        {snackbarValues.value}
      </Snackbar>
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export const notesScreenOptions = ({ navigation }) => {
  return {
    title: "Notes",
    headerLeft: () => (
      <IconButton
        onPress={() => navigation.toggleDrawer()}
        icon="menu"
        color="black"
      />
    ),
  };
};
