import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";

import { firestore } from "../config";

import { addMultipleDocs,deleteDoc } from "../store/actions/docs";

import IconButton from "../components/IconButton";
import Docs from "../components/Docs";
import { useSelector, useDispatch } from "react-redux";
const DocsDashboard = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const docs = useSelector((state) => state.docs.docs);
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
      console.error(err.message);
    }
  }, [firestore, dispatch, userId]);

  useEffect(() => {
    fetchDocsFromFirestore();
  }, [fetchDocsFromFirestore]);


  const handleDeleteFromCollection = async (doc) => {
    setIsLoading(true);
    try {
      await firestore.collection("docsDepo").doc(doc).delete();
      dispatch(deleteDoc({id: doc}))
    }
    catch (err) {
      Alert.alert("Error", err.message,[{
        text: "Ok",
        style: "cancel",
      },]);
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



  return (
    <View style={styles.screen}>
      <FlatList
        data={docs}
        renderItem={({ item }) => <Docs doc={item} isLoading={isLoading} deleteDoc={()=> {handleDelete(item.id)}} />}
        refreshing={isLoading}
        onRefresh={fetchDocsFromFirestore}
      />
    </View>
  );
};

export default DocsDashboard;

const styles = StyleSheet.create({
  drawerIcon: { marginLeft: 10 },
  screen: {
    flex: 1,
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
