import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
const IconButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={props.style}>
                <Ionicons name={props.iconIos} size={24} color={props.color} />
            </View>
        </TouchableOpacity>
    )
}

export default IconButton

