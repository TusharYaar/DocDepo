import React from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'

import {format } from "date-fns";

import Body from "../components/Body"
const Docs = ({doc, isLoading,deleteDoc}) => {
    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.date}>{format(new Date(doc.createdAt.toDate()),"EEE MMM dd yyyy")}</Text>
            <Body numberOfLines={1} >{doc.name}</Body>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                <Button title="Download" onPress={ () => {}} disabled={isLoading}/>
                </View>
                <View style={styles.button}>
                <Button title="delete" color="red" onPress={deleteDoc} disabled={isLoading}/>
                </View>
            </View>
        </View>
    )
}

export default Docs;

const styles = StyleSheet.create({
    container: {
       maxHeight: 500,
       minHeight: 130,
       width: "100%",
       marginVertical: 10,
       padding: 10,
       elevation: 4,
       borderRadius: 5,
       backgroundColor:"white",
       justifyContent: "space-between"
    },
    date: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    marginBottom: 5,
    },
    buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    },
    button: {
    margin: 5,
    }
})
