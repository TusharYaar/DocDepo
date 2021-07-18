import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";

import { firestore, storage, TIMESTAMP } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { addMultipleDocs, deleteDoc, addDoc } from "../store/actions/docs";

import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import { FAB, Card, Snackbar, ActivityIndicator } from "react-native-paper";

import IconButton from "../components/IconButton";
import Docs from "../components/Docs";

const DocsDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fabOpen, setFabOpen] = useState({ open: false });
  const [isUploading, setIsUploading] = useState(null);
  const [snackbarValues, setSnackbarValues] = useState({
    value: "Copied",
    visible: false,
  });
  const userId = useSelector((state) => state.user.uid);
  const userEmail = useSelector((state) => state.user.email);
  const docs = useSelector((state) => state.docs.docs);

  const dispatch = useDispatch();

  const onFabStateChange = ({ open }) => setFabOpen({ open });
  const onDismissSnackBar = () =>
    setSnackbarValues({ value: "Copied", visible: false });

  const fetchDocsFromFirestore = useCallback(async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await firestore
        .collection("docsDepo")
        .where("user", "==", userId)
        .get();
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      dispatch(addMultipleDocs(arr));
      setIsLoading(false);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }, [firestore, dispatch, userId]);

  useEffect(() => {
    fetchDocsFromFirestore();
  }, [fetchDocsFromFirestore]);

  const handleDeleteFromCollection = async (doc) => {
    setIsLoading(true);
    try {
      await firestore.collection("docsDepo").doc(doc).delete();
      dispatch(deleteDoc({ id: doc }));
    } catch (err) {
      Alert.alert("Error", err.message);
    }
    setIsLoading(false);
  };
  const handleDelete = (doc) => {
    Alert.alert("Delete doc", "This doc will be deleted", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => handleDeleteFromCollection(doc),
        style: "destructive",
      },
    ]);
  };

  const downloadDoc = (docURL, filename) => {
    FileSystem.downloadAsync(docURL, FileSystem.documentDirectory + filename)
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
      })
      .catch((error) => {
        Alert.alert("Error", err.message);
      });
  };

  const handleDocumentPick = async () => {
    try {
      const { name, size, type, uri } = await DocumentPicker.getDocumentAsync();
      if (type != "success") return;
      if (size > 52428800) {
        Alert.alert(
          "File Too Large",
          "The file size should be smaller than 50MB"
        );
        return;
      }
      setSnackbarValues({
        value: "Uploading... Please wait",
        visible: true,
      });
      const fileRef = storage.child(`${userId}/${name}`);
      const uploadTask = await fileRef.put(uri);
      const fileUrl = await uploadTask.ref.getDownloadURL();
      const doc = {
        name: name,
        url: fileUrl,
        user: userId,
        createdAt: TIMESTAMP.now(),
        userEmail: userEmail,
        path: `${userId}/${name}`,
        type: "document",
      };
      const ref = await firestore.collection("docsDepo").add(doc);
      dispatch(addDoc({ id: ref.id, ...doc }));
      setSnackbarValues({
        value: "Document Uploaded to you depo",
        visible: true,
      });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={docs}
        renderItem={({ item }) => (
          <Docs
            doc={item}
            isLoading={isLoading}
            deleteDoc={() => {
              handleDelete(item.id);
            }}
            downloadDoc={() => {
              downloadDoc(item.url, item.name);
            }}
          />
        )}
        refreshing={isLoading}
        onRefresh={fetchDocsFromFirestore}
      />

      <FAB.Group
        style={styles.fab}
        open={fabOpen.open}
        icon={fabOpen.open ? "file-cancel" : "plus"}
        actions={[
          // {
          //   icon: "image",
          //   label: "Image",
          //   onPress: () => console.log("Pressed email"),
          // },
          {
            icon: "camera-enhance",
            label: "Camera",
            onPress: ()=> props.navigation.navigate("Camera"),
            small: false,
          },
          {
            icon: "microphone-plus",
            label: "Audio",
            onPress: ()=> props.navigation.navigate("Audio"),
            small: false,
          },
          {
            icon: "file-document-outline",
            label: "Document",
            onPress: handleDocumentPick,
            small: false,
          },
        ]}
        onStateChange={onFabStateChange}
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

export default DocsDashboard;

const styles = StyleSheet.create({
  drawerIcon: { marginLeft: 10 },
  screen: {
    flex: 1,
    padding: 10,
  },
  fab: {
    bottom: 0,
    right: 0,
  },
});

export const docsScreenOptions = ({ navigation, route }) => {
  return {
    title: "Docs",
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
