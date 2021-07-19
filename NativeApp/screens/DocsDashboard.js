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
  const {navigation,route} = props;
  const {params } = route;
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


  const handleUploadDocs = useCallback( async (uri) => {
    const fetchResponse = await fetch(uri);
    const file = await fetchResponse.blob();
    const {name, size, type} = file._data
    if ( size > 52428800) {
      Alert.alert(
        "File Too Large",
        "The file size should be smaller than 50MB"
      );
      return;
    }
    if(docs.findIndex(doc => doc.name === name) > -1){
      return;
    }
    setIsUploading(true);
    setSnackbarValues({
      value: "Uploading... Please wait",
      visible: true,
    });
    const fileRef = storage.child(`${userId}/${name}`);
    const uploadTask = await fileRef.put(file);
    const url = await uploadTask.ref.getDownloadURL();
    const doc = {
     name,
      url,
      userEmail,
      user: userId,
      type,
      createdAt: TIMESTAMP.now(),
      path: `${userId}/${name}`,
    };
    const ref = await firestore.collection("docsDepo").add(doc);
    dispatch(addDoc({ id: ref.id, ...doc }));
    setSnackbarValues({
      value: "Document Uploaded to you depo",
      visible: true,
    });
    setIsUploading(false);
    
  },[userId,userEmail] )

  useEffect(() => {
    fetchDocsFromFirestore();
  }, [fetchDocsFromFirestore]);

  useEffect(() => {
    if(params && params.uri)
      {handleUploadDocs(params.uri);
      
      }
  },[params,handleUploadDocs])

  const handleDeleteFromCollection = async (doc,path) => {
    setIsLoading(true);
    try {
      await firestore.collection("docsDepo").doc(doc).delete();
      await storage.child(path).delete();
      dispatch(deleteDoc({ id: doc }));
    } catch (err) {
      Alert.alert("Error", err.message);
    }
    setIsLoading(false);
  };
  const handleDelete = (doc,path) => {
    Alert.alert("Delete doc", "This doc will be deleted", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => handleDeleteFromCollection(doc,path),
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
      const { type, uri } = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: false});
      if (type != "success") return;
      handleUploadDocs(uri);

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
              handleDelete(item.id,item.path);
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
        visible={!isUploading}
        open={fabOpen.open}
        icon={fabOpen.open ? "file-cancel" : "plus"}
        actions={[
          {
            icon: "camera-enhance",
            label: "Camera",
            onPress: ()=> navigation.navigate("Camera"),
            small: false,
          },
          {
            icon: "microphone-plus",
            label: "Audio",
            onPress: ()=> navigation.navigate("Audio"),
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
        action={{
          label: 'Hide',
          onPress: onDismissSnackBar
        }}
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
