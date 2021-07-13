import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = (props) => {
    return (
            <Text style={styles.textStyle}>{props.children}</Text>
    )
}

export default Header

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 52,
        fontFamily: "Manrope_800ExtraBold"
    }
})
