import React from 'react'
import { StyleSheet, TouchableNativeFeedback,View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
const IconButton = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={styles.center}>
            <MaterialIcons name={props.icon} size={24} color={props.color} />
                </View> 
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    center: {
marginLeft: 10,
    }
})

export default IconButton;
