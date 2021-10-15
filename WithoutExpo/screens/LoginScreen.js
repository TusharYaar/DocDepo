import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  StatusBar,
  Platform,
} from "react-native";
import { TextInput, Button,ActivityIndicator } from "react-native-paper";
import { auth, CLIENT_ID,ANDROID_CLIENT_ID,googleAuthProvider } from "../config";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-google-app-auth';

import { useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { loginUser } from "../store/actions/user";

import Header from "../components/Header";
import Body from "../components/Body";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { colors } = useTheme();

  const saveUser = (resData)=> {
    const data = {
      expirationTime: resData.stsTokenManager.expirationTime,
      accessToken: resData.stsTokenManager.accessToken,
      email: resData.email,
      apiKey: resData.apiKey,
      uid: resData.uid,
    };
    dispatch(loginUser(data));
  }


  const handleLogin = async () => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const resData = auth.currentUser.toJSON();
      saveUser(resData);
    } catch (err) {
      Alert.alert("Error",err.message);
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const googleUser = await Google.logInAsync({
        androidClientId: CLIENT_ID,
        androidStandaloneAppClientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email']
      });
      if (googleUser.type === 'success') {
        const credential = await googleAuthProvider.credential(googleUser.idToken);
        await auth.signInWithCredential(credential);
        const user = auth.currentUser.toJSON();
        saveUser(user);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
    setGoogleLoading(false);
  }

  return (
          <ScrollView style={{...styles.screen, backgroundColor: colors.background}}>
      <Header>Login</Header>
      <View style={styles.container}>
        <View style={styles.margin}>
          <Body>Email</Body>
          <TextInput
            value={email}
            label="Email"
            type="flat"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        </View>
        <View style={styles.margin}>
          <Body>Password</Body>
          <TextInput
            label="Password"
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator animating={true}/>
        ) : (
          <Button
            mode={Platform.OS === "android" ? "contained" : "text"}
            onPress={handleLogin}
          >
            Login
          </Button>
        )}
      </View>
      <View style={styles.margin}>
      {
        googleLoading ? <ActivityIndicator animating={true} /> : 
      <Button
      mode={Platform.OS === "android" ? "contained" : "text"}
      onPress={handleGoogleLogin}
      icon="google"
      >
        Sign in with Google
      </Button>
        }
          </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10,
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    width: "100%",
    padding: 10,
    fontSize: 20,
    fontFamily: "Manrope_400Regular",
  },
  container: {
    marginVertical: 20,
  },
  margin: { marginVertical: 20 },
});
