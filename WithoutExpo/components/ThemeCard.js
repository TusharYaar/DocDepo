import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

import {Button, Card,RadioButton } from "react-native-paper"
import {format} from "date-fns";

import Body from "./Body"
const ThemeCard = ({theme,changeTheme}) => {
    return (
        <View style={styles.row}>
            <RadioButton value={theme.value}/>
            <Body>
                {theme.label}
            </Body>
        </View>
    )
}

export default ThemeCard

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    }
})
