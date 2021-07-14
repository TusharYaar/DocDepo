import React from 'react'
import { StyleSheet, View,TouchableNativeFeedback,TouchableOpacity, Platform } from 'react-native'

import IconButton from "../components/IconButton";

const AddButton = (props) => {
    const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <View style={styles.button}>
        <Touchable onPress={props.onPress} style={styles.inner}>
            <View style={styles.inner}>
           <IconButton
          onPress={props.onPress}
          icon="book-plus"
          iconIcon="ios-add-sharp"
          color="white"
          />
          </View>
        </Touchable>
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

},
inner :{
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
}
})
