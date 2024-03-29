import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Alert, Platform} from 'react-native';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../store/actions/user';

import Header from '../components/Header';
import Body from '../components/Body';

GoogleSignin.configure({
  webClientId:
    '920988754215-gb2rl2a580cr63qh21pf5idl0jmc3pqn.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const {colors} = useTheme();

  const onAuthStateChanged = user => {
    if (user) {
      const {email, uid} = user;
      dispatch(loginUser({email, uid}));
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Empty Fields', 'Please enter email and password');
      return;
    }
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert('Error', err.message);
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
    } catch (err) {
      Alert.alert('Error', err.message);
      setGoogleLoading(false);
    }
  };

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
            onChangeText={text => {
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
            onChangeText={text => {
              setPassword(text);
            }}
          />
        </View>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Button
            mode={Platform.OS === 'android' ? 'contained' : 'text'}
            onPress={handleLogin}>
            Login
          </Button>
        )}
      </View>
      <View style={styles.margin}>
        {googleLoading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Button
            mode={Platform.OS === 'android' ? 'contained' : 'text'}
            onPress={handleGoogleLogin}
            icon="google">
            Sign in with Google
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    fontSize: 20,
    fontFamily: 'Manrope_400Regular',
  },
  container: {
    marginVertical: 20,
  },
  margin: {marginVertical: 20},
});
