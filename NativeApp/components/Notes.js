import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'

import {Button, Card} from "react-native-paper"
import {format } from "date-fns";

import Body from "../components/Body"
const Notes = ({note,copyToClipboard,deleteNote,disabled}) => {
    return (
<Card style={styles.container}>
<Card.Content>
            <Text style={styles.date}>{format(new Date(note.createdAt.toDate()),"EEE MMM dd yyyy")}</Text>
            <Body>{note.text}</Body>
            </Card.Content>
            <Card.Actions style={styles.buttonContainer}>
                <Button title="copy" onPress={copyToClipboard} disabled={disabled} mode={Platform.OS === "android" ? "contained" : "text"} style={styles.button}>Copy</Button>
                <Button title="delete" color="red" mode={Platform.OS === "android" ? "contained" : "text"} onPress={deleteNote} style={styles.button} disabled={disabled}>Delete</Button>
            </Card.Actions>
</Card>
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
    },
    date: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    marginBottom: 5,
    },
    buttonContainer: {
    justifyContent: "flex-end",
    },
    button: {
    margin: 5,
    }
})
