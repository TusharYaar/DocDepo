import React from 'react'
import { StyleSheet, Text, View,Button } from 'react-native'

import {format } from "date-fns";

import Body from "../components/Body"
const Notes = ({note,copyToClipboard,deleteNote,disabled}) => {
    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.date}>{format(new Date(note.createdAt.toDate()),"EEE MMM dd yyyy")}</Text>
            <Body>{note.text}</Body>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                <Button title="copy" onPress={copyToClipboard} disabled={disabled}/>
                </View>
                <View style={styles.button}>
                <Button title="delete" color="red" onPress={deleteNote} disabled={disabled}/>
                </View>
            </View>
        </View>
    )
}

export default Notes;

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
