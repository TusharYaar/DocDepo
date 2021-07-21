import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@react-navigation/native';
const Title = (props) => {
    const { colors } = useTheme();
    return (
            <Text {...props} style={{...styles.textStyle, color: colors.text}}>{props.children}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 26,
        fontFamily: "Manrope_700Bold"
    }
})
