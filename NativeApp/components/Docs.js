import React from 'react'
import { StyleSheet, Text, View ,Platform } from 'react-native'
import {Button, IconButton, Card} from "react-native-paper";
import {format } from "date-fns";

import Body from "../components/Body"
const Docs = ({doc, isLoading,deleteDoc,downloadDoc,shareDoc}) => {
    return (
        <Card style={styles.container}>
            <Card.Content>
            <Text style={styles.date}>{format(new Date(doc.createdAt.toDate()),"EEE MMM dd yyyy")}</Text>
            <Body>{doc.name}</Body>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
                <IconButton icon="share-variant" size={20} onPress={shareDoc} />
                <View style={styles.buttonContainer}>
                
                <Button onPress={downloadDoc} mode={Platform.OS === "android" ? "contained" : "text"} disabled={isLoading} style={styles.button}>Download</Button>
      
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
    cardActions: {
    justifyContent: "space-between",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    button: {
    margin: 5,
    }
})
