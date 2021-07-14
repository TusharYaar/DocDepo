import React , {useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'
import IconButton from "../components/IconButton";

import {firestore} from "../config"

import { useSelector } from 'react-redux';
const DocsDashboard = () => {

    const [docs, setDocs] = useState([]);
    const userId = useSelector(state => state.user.uid);


    return (
        <View>
            <Text>This is Docs dashboard</Text>
        </View>
    )
}

export default DocsDashboard

const styles = StyleSheet.create({
    drawerIcon: {marginLeft: 10}
})


export const docsScreenOptions = ({ navigation, route }) => {
    return { 
        title: "Docs" ,
        headerLeft: () => (
            <IconButton
              onPress={() => navigation.toggleDrawer()}
              icon="menu"
              iconIos="ios-menu-sharp"
              style={styles.drawerIcon}
              color="black"
            />
          ),
    }
}