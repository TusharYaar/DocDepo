import React from 'react'
import { StyleSheet, Text, View ,Platform } from 'react-native'
import {Button, Card} from "react-native-paper";
import {format } from "date-fns";

import Body from "../components/Body"
const Docs = ({doc, isLoading,deleteDoc,downloadDoc}) => {
    return (
        <Card style={styles.container}>
            <Card.Content>
            <Text style={styles.date}>{format(new Date(doc.createdAt.toDate()),"EEE MMM dd yyyy")}</Text>
            <Body numberOfLines={1} >{doc.name}</Body>
            </Card.Content>
            <Card.Actions style={styles.buttonContainer}>
                <View style={styles.button}>
                {/* <Button onPress={downloadDoc} mode={Platform.OS === "android" ? "contained" : "text"} disabled={isLoading}>Download</Button> */}
                </View>
                <View style={styles.button}>
                <Button title="delete" color="red" mode={Platform.OS === "android" ? "contained" : "text"} onPress={deleteDoc} style={styles.button} disabled={isLoading}>Delete</Button>

                </View>
            </Card.Actions>
        </Card>
    )
}

export default Docs;

const styles = StyleSheet.create({
    container: {
       maxHeight: 500,
       minHeight: 130,
       width: "100%",
       marginVertical: 10,
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
