import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import { IconButton,RadioButton, Card } from "react-native-paper";

import {useSelector, useDispatch} from "react-redux";
import { updateTheme } from '../store/actions/theme';

import { useTheme } from '@react-navigation/native';

import THEMES from "../themes";

import ThemeCard from '../components/ThemeCard.js';
const Settings = () => {
    const [allThemes, setThemes] = useState([]);
    const {value,label} = useTheme(); 
    useEffect(() => {
      let arr = [];
      for(const theme in THEMES) {
        arr.push(THEMES[theme]);
      }
      setThemes(arr);
    },[THEMES])

    const user = useSelector(state => state.user);
    const currentTheme = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();

    const changeTheme = async (value) => {
      dispatch(updateTheme(value));
    }
    return (
        <View>
            <RadioButton.Group value={currentTheme} onValueChange={(value) => changeTheme(value)}>
            <FlatList data={allThemes} renderItem={item => <ThemeCard theme={item.item} changeTheme={changeTheme}/> } keyExtractor={item => item.value} /> 
            </RadioButton.Group>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({})

export const settingsScreenOptions = ({ navigation }) => {
    return {
      title: "Settings",
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.toggleDrawer()}
          icon="menu"
        />
      ),
      headerTitleStyle: {
        fontFamily: "Manrope_700Bold",
        fontWeight: "normal",
      },
    };
  };