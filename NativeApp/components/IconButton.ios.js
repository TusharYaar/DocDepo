import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
const IconButton = () => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Ionicons name={`ios-${props.icon}`} size={24} color={props.color} />
        </TouchableOpacity>
    )
}

export default IconButton
const styles = StyleSheet.create({})
