import React,{useEffect, useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppLoading } from "expo-app-loading";
import {useDispatch} from "react-redux";

import { compareAsc } from 'date-fns'

import {noUser,autoLoginUser} from "../store/actions/user";

const LoadingScreen = () => {  
    const dispatch = useDispatch();
    const getData = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('@user_details');

      if(value !== null) {
        data = JSON.parse(value);
        if (compareAsc(new Date(data.expirationTime), new Date()) > 0) {
            dispatch(autoLoginUser(data))
        }
        else dispatch(noUser());
      }
      else dispatch(noUser());
    } catch(e) {
      // error reading value
    }
  },[dispatch]);
    useEffect(() => {
        getData();
    },[getData])
    return (
        <View screen>
            <Text>Loading Screen</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({})
