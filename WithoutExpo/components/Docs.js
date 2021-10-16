import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Button, IconButton, Card } from "react-native-paper";
import { format, compareAsc } from "date-fns";
import Body from "../components/Body";
import DateText from "../components/DateText";
import NewTag from "./NewTag";

const Docs = ({ doc, isLoading, deleteDoc, shareDoc }) => {
  console.log(
    compareAsc(new Date(doc.createdAt.toDate()), new Date(doc.lastLogin))
  );

  return (
    <Card style={styles.container}>
      <Card.Content>
        {compareAsc(new Date(doc.createdAt.toDate()), new Date(doc.lastLogin)) >
          -1 && <NewTag />}
        <DateText style={styles.date}>
          {format(new Date(doc.createdAt.toDate()), "EEE MMM dd, yyyy")}
        </DateText>
        <Body>{doc.name}</Body>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <IconButton icon="share-variant" size={20} onPress={shareDoc} />
        <View style={styles.buttonContainer}>
          <Button
            color="red"
            mode={Platform.OS === "android" ? "contained" : "text"}
            onPress={deleteDoc}
            style={styles.button}
            disabled={isLoading}
          >
            Delete
          </Button>
        </View>
      </Card.Actions>
    </Card>
  );
};

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
  },
});
