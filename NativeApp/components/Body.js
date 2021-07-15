import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Body = (props) => {
    return (
            <Text {...props} style={styles.textStyle}>{props.children}</Text>
    )
}

export default Body

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        fontFamily: "Manrope_400Regular"
    }
})
