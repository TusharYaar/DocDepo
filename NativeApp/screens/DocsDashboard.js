import React , {useState,useEffect} from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'
import IconButton from "../components/IconButton";

// import {Database} from "../config"

import { useSelector } from 'react-redux';
const DocsDashboard = () => {

    const userId = useSelector(state => state.user.uid);
    return (
        <View>
            <Text>This is Docs dashboard</Text>
        </View>
    )
}

export default DocsDashboard

const styles = StyleSheet.create({})


export const docsScreenOptions = ({ navigation, route }) => {
    return { 
        title: "Docs" ,
        headerLeft: () => (
            <IconButton
              onPress={() => navigation.toggleDrawer()}
              icon="menu"
              color="black"
            />
          ),
    }
}