import React from 'react'
import { StyleSheet, Text, View,TouchableNativeFeedback } from 'react-native'

import IconButton from "../components/IconButton";

const AddButton = (props) => {
    return (
        <View style={styles.button}>
           <TouchableNativeFeedback>
           <IconButton
          onPress={props.onPress}
          icon="book-plus"
          iconIson="ios-refresh-sharp"
          color="white"
        />
           </TouchableNativeFeedback>
        </View>
    )
}

export default AddButton

const styles = StyleSheet.create({
 button:{   position: "absolute",
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
}
})
