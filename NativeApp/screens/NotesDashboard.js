import React , {useState,useEffect,useCallback} from 'react'

import { StyleSheet, Text, View,Button } from 'react-native'
import IconButton from "../components/IconButton";
import { useSelector } from 'react-redux';

import {firestore} from "../config"

const NotesDashboard = () => {
    const userId = useSelector(state => state.user.uid);

    const fetchDocsFromFirestore = useCallback(async () => {
        const querySnapshot = await firestore.collection("notesDepo").where("user", "==", userId).get()
        // console.log(querySnapshot.data);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    },[firestore]);

    useEffect(() => {
        fetchDocsFromFirestore();
    },[fetchDocsFromFirestore])



    return (
        <View>
            <Text>This is Notes Dashboard</Text>
            <Button title="Refresh" onPress={fetchDocsFromFirestore}/>
        </View>
    )
}

export default NotesDashboard

const styles = StyleSheet.create({
    drawerIcon: {marginLeft: 10}
})

export const notesScreenOptions = ({ navigation, route }) => {
    return { 
        title: "Notes" ,
        headerLeft: () => (
            <IconButton
              onPress={() => navigation.toggleDrawer()}
              icon="menu"
              iconIson="ios-menu-sharp"
              style={styles.drawerIcon}
              color="black"
            />
          ),
        
    }
}