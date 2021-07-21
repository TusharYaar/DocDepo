import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native';
const Header = (props) => {
    const { colors } = useTheme();
    return (
            <Text style={{...styles.textStyle,  color: colors.text}} >{props.children}</Text>
    )
}

export default Header

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 52,
        fontFamily: "Manrope_800ExtraBold"
    }
})
