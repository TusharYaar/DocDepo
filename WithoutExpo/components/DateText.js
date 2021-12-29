import React from 'react';
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@react-navigation/native';

const DateText = (props) => {
    const { colors } = useTheme();
    return (
            <Text style={{...styles.date, color: colors.placeholder}}>{props.children}</Text>

    )
}

export default DateText

const styles = StyleSheet.create({
    date: {
      fontSize: 14,
      fontFamily: "Manrope_400Regular",
      marginBottom: 5,
    },
  });
  
