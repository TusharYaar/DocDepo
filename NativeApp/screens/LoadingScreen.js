import React,{useEffect, useCallback} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch} from "react-redux";

import { compareAsc } from 'date-fns'

import {auth } from "../config"

import {loginUser,noUser,autoLoginUser} from "../store/actions/user";

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
        else{
          await auth.currentUser.getIdToken(true);
          const user = auth.currentUser.toJSON();
          const data = {
            expirationTime: user.stsTokenManager.expirationTime,
            accessToken: user.stsTokenManager.accessToken,
            email: user.email,
            apiKey: user.apiKey,
            uid: user.uid,
          };
          dispatch(loginUser(data));
        };
      }
      else dispatch(noUser());
    } catch(err) {
      dispatch(noUser());
      // error 
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
