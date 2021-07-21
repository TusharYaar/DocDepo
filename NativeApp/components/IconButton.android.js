import React from 'react'
import { TouchableNativeFeedback,View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';


const IconButton = (props) => {
  const { colors } = useTheme();
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={props.style}>
            <MaterialCommunityIcons name={props.icon} size={props.size ? props.size : 24} color={props.color || colors.text} />
                </View> 
        </TouchableNativeFeedback>
    )
}


export default IconButton;
