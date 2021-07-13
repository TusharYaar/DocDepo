import React ,{useState} from 'react';
import { StyleSheet, Text, View, TextInput,Button ,ActivityIndicator} from 'react-native'

import {auth} from "../config";

import { useDispatch } from 'react-redux';

import {loginUser} from "../store/actions/user";
const LoginScreen = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("testtest");
    const [isLoading, setLoading] = useState(false);
    const handleLogin = async () => {
        setLoading(true);
       try {
        await auth.signInWithEmailAndPassword(email, password);
        const  resData = await auth.currentUser.toJSON();
        const data = {
            expirationTime:resData.stsTokenManager.expirationTime,
            accessToken:resData.stsTokenManager.accessToken,
            email:  resData.email,
            apiKey: resData.apiKey,
            uid: resData.uid
        }
        dispatch(loginUser(data));
    } catch (err) {
        console.log(err.message);
        setLoading(false);      
    }
    }
    return (
        <View style={styles.screen}>
            <Text>Login Screen</Text>
            <View>
                <Text>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={(text) => {setEmail(text)}}/>
                <Text>Password</Text>
                <TextInput style={styles.input} value={password} onChangeText={(text) => {setPassword(text)}}/>
            </View>
           { isLoading ? <ActivityIndicator color="black"/> :   <Button title="Login" onPress={handleLogin} />
           } 
            </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        width: "100%"
      },
})
