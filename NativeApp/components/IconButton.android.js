import React from 'react'
import { TouchableNativeFeedback,View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const IconButton = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={props.style}>
            <MaterialCommunityIcons name={props.icon} size={props.size ? props.size : 24} color={props.color} />
                </View> 
        </TouchableNativeFeedback>
    )
}


export default IconButton;
