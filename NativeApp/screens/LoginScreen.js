import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  Platform,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth, googleAuthProvider, CLIENT_ID } from "../config";

import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

import { useDispatch } from "react-redux";
import { loginUser } from "../store/actions/user";

import Header from "../components/Header";
import Body from "../components/Body";
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const resData = await auth.currentUser.toJSON();
      const data = {
        expirationTime: resData.stsTokenManager.expirationTime,
        accessToken: resData.stsTokenManager.accessToken,
        email: resData.email,
        apiKey: resData.apiKey,
        uid: resData.uid,
      };
      dispatch(loginUser(data));
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: CLIENT_ID,
  });
  useEffect(() => {
    const loginSuccess = async () => {
      const { id_token } = response.params;
      const credential = await googleAuthProvider.credential(id_token);
      await auth.signInWithCredential(credential);
      const resData = await auth.currentUser.toJSON();
      const data = {
        expirationTime: resData.stsTokenManager.expirationTime,
        accessToken: resData.stsTokenManager.accessToken,
        email: resData.email,
        apiKey: resData.apiKey,
        uid: resData.uid,
      };
      dispatch(loginUser(data));
    };

    if (response?.type === "success") {
      loginSuccess();
    }
  }, [response]);

  return (
    <View style={styles.screen}>
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
          <ActivityIndicator color="black" size="large" />
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
      <Button
        disabled={!request}
        mode={Platform.OS === "android" ? "contained" : "text"}
        onPress={() => {
            promptAsync();
        }}
        >
        Sign in with Google
      </Button>
          </View>
    </View>
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
