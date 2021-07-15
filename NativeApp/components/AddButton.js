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
          icon="card-plus"
          iconIcon="ios-add-sharp"
          color="white"
          size={36}
          />
          </View>
        </Touchable>
        </View>
    )
}

export default AddButton

const styles = StyleSheet.create({
 button:{   position: "absolute",
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 35,

},
inner :{
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
}
})
